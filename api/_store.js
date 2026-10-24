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
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return { url, token };
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
      return data.result;
    }
  } catch (err) {
    console.warn('[DevStore] KV error:', err.message);
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
  getActiveConfig,
  setActiveConfig,
  resetActiveConfig
};
