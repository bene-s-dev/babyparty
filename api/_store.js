// Secure server-side store for dev configuration (Date & Gender)
// Fully managed through Developer Mode — NO gender in process.env!
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PRIMARY_CONFIG_FILE = path.join(__dirname, '..', '.dev-runtime-config.json');
const TMP_CONFIG_FILE = path.join('/tmp', '.dev-runtime-config.json');

// Default target: Donnerstag 29.10.2026, 18:00 Uhr Berlin time (CET UTC+1)
const DEFAULT_TARGET_DATE = '2026-10-29T18:00:00+01:00';
const DEFAULT_GENDER = 'boy';

// In-memory cache across serverless warm invocations
let memoryConfigCache = null;

function normalizeGender(val) {
  if (!val) return DEFAULT_GENDER;
  const clean = String(val).toLowerCase().trim();
  if (['girl', 'mädchen', 'maedchen', 'w', 'female'].includes(clean)) {
    return 'girl';
  }
  return 'boy';
}

function verifyDevToken(token) {
  const envPassword = process.env.DEV_PASSWORD ? process.env.DEV_PASSWORD.trim() : '';
  if (!envPassword || !token) return false;
  const expectedToken = crypto.createHmac('sha256', envPassword).update('baby_dev_auth_session').digest('hex');
  return token === expectedToken;
}

function getKvConfig() {
  // 1. Direct explicit environment variable checks
  const explicitPairs = [
    // Exact Vercel Storage connection prefix
    ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
    // Database: upstash-kv-lime-notebook (common Vercel Marketplace naming conventions)
    ['UPSTASH_KV_LIME_NOTEBOOK_REST_API_URL', 'UPSTASH_KV_LIME_NOTEBOOK_REST_API_TOKEN'],
    ['UPSTASH_KV_LIME_NOTEBOOK_REST_URL', 'UPSTASH_KV_LIME_NOTEBOOK_REST_TOKEN'],
    ['UPSTASH_KV_LIME_NOTEBOOK_URL', 'UPSTASH_KV_LIME_NOTEBOOK_TOKEN'],
    ['UPSTASH_KV_LIME_NOTEBOOK_KV_REST_API_URL', 'UPSTASH_KV_LIME_NOTEBOOK_KV_REST_API_TOKEN'],
    // Generic Upstash & Vercel KV defaults
    ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
    ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
    ['UPSTASH_REST_API_URL', 'UPSTASH_REST_API_TOKEN'],
    ['REDIS_REST_API_URL', 'REDIS_REST_API_TOKEN']
  ];

  for (const [urlKey, tokenKey] of explicitPairs) {
    const url = process.env[urlKey];
    const token = process.env[tokenKey];
    if (url && token) {
      return {
        url: url.trim().replace(/\/+$/, ''),
        token: token.trim(),
        source: urlKey
      };
    }
  }

  // 2. Dynamic auto-discovery for any Upstash / KV environment variables
  const envKeys = Object.keys(process.env);
  
  // Specific match for lime notebook
  const limeUrlKey = envKeys.find(k => k.includes('LIME_NOTEBOOK') && (k.includes('URL') || k.includes('REST')));
  const limeTokenKey = envKeys.find(k => k.includes('LIME_NOTEBOOK') && (k.includes('TOKEN') || k.includes('PASSWORD')));
  if (limeUrlKey && limeTokenKey && process.env[limeUrlKey] && process.env[limeTokenKey]) {
    return {
      url: process.env[limeUrlKey].trim().replace(/\/+$/, ''),
      token: process.env[limeTokenKey].trim(),
      source: limeUrlKey
    };
  }

  // Generic match for any Upstash / KV REST endpoints
  const genericUrlKey = envKeys.find(k => (k.includes('UPSTASH') || k.includes('KV')) && k.endsWith('_URL'));
  const genericTokenKey = envKeys.find(k => (k.includes('UPSTASH') || k.includes('KV')) && (k.endsWith('_TOKEN') || k.endsWith('_KEY')));
  if (genericUrlKey && genericTokenKey && process.env[genericUrlKey] && process.env[genericTokenKey]) {
    return {
      url: process.env[genericUrlKey].trim().replace(/\/+$/, ''),
      token: process.env[genericTokenKey].trim(),
      source: genericUrlKey
    };
  }

  return null;
}

async function kvExecute(commandArray) {
  const kv = getKvConfig();
  if (!kv) return null;
  try {
    const res = await fetch(kv.url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + kv.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commandArray)
    });
    if (res.ok) {
      const data = await res.json();
      return (data && data.result !== undefined) ? data.result : data;
    } else {
      const errText = await res.text().catch(() => '');
      console.warn(`[DevStore] Upstash KV (${kv.source}) HTTP ${res.status}:`, errText);
    }
  } catch (err) {
    console.warn(`[DevStore] Upstash KV (${kv.source}) error:`, err.message);
  }
  return null;
}

async function getActiveConfig() {
  let targetDate = DEFAULT_TARGET_DATE;
  let gender = DEFAULT_GENDER;
  let isCustom = false;

  // 1. Try Vercel KV / Upstash Redis if configured
  const kvResult = await kvExecute(['GET', 'baby_reveal_config']);
  if (kvResult) {
    let val = kvResult;
    if (typeof val === 'string') {
      try { val = JSON.parse(val); } catch (e) {}
    }
    if (val && typeof val === 'object') {
      if (val.targetDate && !isNaN(new Date(val.targetDate).getTime())) {
        targetDate = val.targetDate;
        isCustom = true;
      }
      if (val.gender) {
        gender = normalizeGender(val.gender);
        isCustom = true;
      }
      memoryConfigCache = { targetDate, gender, isCustom };
      return {
        targetDate,
        targetTimeMs: new Date(targetDate).getTime(),
        gender,
        isCustom
      };
    }
  }

  // 2. Try file system (.dev-runtime-config.json or /tmp)
  const candidateFiles = [PRIMARY_CONFIG_FILE, TMP_CONFIG_FILE];
  for (const filePath of candidateFiles) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed.targetDate && !isNaN(new Date(parsed.targetDate).getTime())) {
          targetDate = parsed.targetDate;
          isCustom = true;
        }
        if (parsed.gender) {
          gender = normalizeGender(parsed.gender);
          isCustom = true;
        }
        memoryConfigCache = { targetDate, gender, isCustom };
        return {
          targetDate,
          targetTimeMs: new Date(targetDate).getTime(),
          gender,
          isCustom
        };
      }
    } catch (err) {
      // Continue to next candidate
    }
  }

  // 3. Try in-memory cache if file was not available
  if (memoryConfigCache) {
    return {
      targetDate: memoryConfigCache.targetDate,
      targetTimeMs: new Date(memoryConfigCache.targetDate).getTime(),
      gender: memoryConfigCache.gender,
      isCustom: memoryConfigCache.isCustom
    };
  }

  // 4. Default fallback
  return {
    targetDate,
    targetTimeMs: new Date(targetDate).getTime(),
    gender,
    isCustom
  };
}

async function setActiveConfig(newConfig) {
  const current = await getActiveConfig();
  const updated = {
    targetDate: (newConfig.targetDate && !isNaN(new Date(newConfig.targetDate).getTime()))
      ? newConfig.targetDate
      : current.targetDate,
    gender: newConfig.gender ? normalizeGender(newConfig.gender) : current.gender,
    isCustom: true,
    updatedAt: new Date().toISOString()
  };

  memoryConfigCache = updated;

  // 1. Persist to Vercel KV / Upstash Redis if available
  await kvExecute(['SET', 'baby_reveal_config', JSON.stringify(updated)]);

  // 2. Persist to file system (Primary or /tmp fallback)
  const candidateFiles = [PRIMARY_CONFIG_FILE, TMP_CONFIG_FILE];
  for (const filePath of candidateFiles) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
      break;
    } catch (err) {
      // EROFS on serverless -> try next path (/tmp)
    }
  }

  return {
    ...updated,
    targetTimeMs: new Date(updated.targetDate).getTime()
  };
}

async function resetActiveConfig() {
  memoryConfigCache = null;

  await kvExecute(['DEL', 'baby_reveal_config']);

  const candidateFiles = [PRIMARY_CONFIG_FILE, TMP_CONFIG_FILE];
  for (const filePath of candidateFiles) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {}
  }

  return await getActiveConfig();
}

module.exports = {
  DEFAULT_TARGET_DATE,
  normalizeGender,
  verifyDevToken,
  getKvConfig,
  getActiveConfig,
  setActiveConfig,
  resetActiveConfig
};
