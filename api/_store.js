// Secure server-side store with Supabase PostgreSQL (and Upstash / File fallback)
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PRIMARY_CONFIG_FILE = path.join(__dirname, '..', '.dev-runtime-config.json');
const TMP_CONFIG_FILE = path.join('/tmp', '.dev-runtime-config.json');

const PRIMARY_RSVP_FILE = path.join(__dirname, '..', '.dev-rsvps.json');
const TMP_RSVP_FILE = path.join('/tmp', '.dev-rsvps.json');

// Default target: Donnerstag 29.10.2026, 18:00 Uhr Berlin time (CET UTC+1)
const DEFAULT_TARGET_DATE = '2026-10-29T18:00:00+01:00';
const DEFAULT_GENDER = 'boy';
const DEFAULT_MODE = 'babyshower'; // 'babyparty' (Gender Reveal) | 'babyshower' (RSVP)

const DEFAULT_BABYSHOWER_CONFIG = {
  date: '2026-01-08',
  time: '14:30',
  location: 'Bergstr. 33, 79539 Lörrach',
  message: 'Bald halten wir unser kleines Wunder in den Armen!\nDiese ganz besondere Vorfreude möchten wir mit unseren liebsten Menschen feiern.'
};

// In-memory cache across serverless warm invocations
let memoryConfigCache = null;
let memoryRsvpsCache = null;

function normalizeGender(val) {
  if (!val) return DEFAULT_GENDER;
  const clean = String(val).toLowerCase().trim();
  if (['girl', 'mädchen', 'maedchen', 'w', 'female'].includes(clean)) {
    return 'girl';
  }
  return 'boy';
}

function normalizeMode(val) {
  if (!val) return DEFAULT_MODE;
  const clean = String(val).toLowerCase().trim();
  if (['babyshower', 'shower', 'rsvp'].includes(clean)) {
    return 'babyshower';
  }
  return 'babyparty';
}

function verifyDevToken(token) {
  const envPassword = process.env.DEV_PASSWORD ? process.env.DEV_PASSWORD.trim() : '';
  if (!envPassword || !token) return false;
  const expectedToken = crypto.createHmac('sha256', envPassword).update('baby_dev_auth_session').digest('hex');
  return token === expectedToken;
}

// ----------------- SUPABASE REST INTEGRATION -----------------
function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL ? process.env.SUPABASE_URL.trim().replace(/\/+$/, '') : null;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (url && key) {
    return {
      url,
      key: key.trim(),
      source: 'Supabase PostgreSQL'
    };
  }
  return null;
}

async function supabaseRequest(endpoint, options = {}) {
  const sb = getSupabaseConfig();
  if (!sb) return null;

  const { throwOnError = false, ...fetchOptions } = options;
  const fullUrl = `${sb.url}/rest/v1/${endpoint.replace(/^\/+/, '')}`;
  const headers = {
    apikey: sb.key,
    Authorization: `Bearer ${sb.key}`,
    'Content-Type': 'application/json',
    ...(fetchOptions.headers || {})
  };
  try {
    const res = await fetch(fullUrl, {
      ...fetchOptions,
      headers
    });
    if (res.ok) {
      const text = await res.text();
      return text ? JSON.parse(text) : true;
    } else {
      const errText = await res.text().catch(() => '');
      const msg = `Supabase Error (${res.status}) ${endpoint}: ${errText}`;
      console.warn(`[DevStore] ${msg}`);
      if (throwOnError) throw new Error(msg);
    }
  } catch (err) {
    console.warn(`[DevStore] Supabase Network Error ${endpoint}:`, err.message);
    if (throwOnError) throw err;
  }
  return null;
}

// ----------------- UPSTASH / VERCEL KV -----------------
function getKvConfig() {
  const explicitPairs = [
    ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
    ['UPSTASH_KV_LIME_NOTEBOOK_REST_API_URL', 'UPSTASH_KV_LIME_NOTEBOOK_REST_API_TOKEN'],
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
    }
  } catch (err) {
    console.warn(`[DevStore] Upstash KV (${kv.source}) error:`, err.message);
  }
  return null;
}

// ----------------- ACTIVE CONFIG MANAGEMENT -----------------
async function getActiveConfig() {
  let targetDate = DEFAULT_TARGET_DATE;
  let gender = DEFAULT_GENDER;
  let mode = DEFAULT_MODE;
  let babyshower = { ...DEFAULT_BABYSHOWER_CONFIG };
  let isCustom = false;

  // 1. Try Supabase
  const sbRows = await supabaseRequest('babyparty_config?key=eq.app_config&select=*');
  if (Array.isArray(sbRows) && sbRows.length > 0 && sbRows[0].value) {
    const val = sbRows[0].value;
    if (val.targetDate && !isNaN(new Date(val.targetDate).getTime())) {
      targetDate = new Date(val.targetDate).toISOString();
      isCustom = true;
    }
    if (val.gender) {
      gender = normalizeGender(val.gender);
      isCustom = true;
    }
    if (val.mode) {
      mode = normalizeMode(val.mode);
      isCustom = true;
    }
    if (val.babyshower && typeof val.babyshower === 'object') {
      babyshower = { ...DEFAULT_BABYSHOWER_CONFIG, ...val.babyshower };
      isCustom = true;
    }
    memoryConfigCache = { targetDate, gender, mode, babyshower, isCustom };
    return {
      targetDate,
      targetTimeMs: new Date(targetDate).getTime(),
      gender,
      mode,
      babyshower,
      isCustom,
      storage: 'Supabase PostgreSQL'
    };
  }

  // 2. Try Upstash / Vercel KV
  const kvResult = await kvExecute(['GET', 'baby_reveal_config']);
  if (kvResult) {
    let val = kvResult;
    if (typeof val === 'string') {
      try { val = JSON.parse(val); } catch (e) {}
    }
    if (val && typeof val === 'object') {
      if (val.targetDate && !isNaN(new Date(val.targetDate).getTime())) {
        targetDate = new Date(val.targetDate).toISOString();
        isCustom = true;
      }
      if (val.gender) {
        gender = normalizeGender(val.gender);
        isCustom = true;
      }
      if (val.mode) {
        mode = normalizeMode(val.mode);
        isCustom = true;
      }
      if (val.babyshower && typeof val.babyshower === 'object') {
        babyshower = { ...DEFAULT_BABYSHOWER_CONFIG, ...val.babyshower };
        isCustom = true;
      }
      memoryConfigCache = { targetDate, gender, mode, babyshower, isCustom };
      return {
        targetDate,
        targetTimeMs: new Date(targetDate).getTime(),
        gender,
        mode,
        babyshower,
        isCustom,
        storage: 'Upstash KV'
      };
    }
  }

  // 3. Try Local File
  const candidateFiles = [PRIMARY_CONFIG_FILE, TMP_CONFIG_FILE];
  for (const filePath of candidateFiles) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed.targetDate && !isNaN(new Date(parsed.targetDate).getTime())) {
          targetDate = new Date(parsed.targetDate).toISOString();
          isCustom = true;
        }
        if (parsed.gender) {
          gender = normalizeGender(parsed.gender);
          isCustom = true;
        }
        if (parsed.mode) {
          mode = normalizeMode(parsed.mode);
          isCustom = true;
        }
        if (parsed.babyshower && typeof parsed.babyshower === 'object') {
          babyshower = { ...DEFAULT_BABYSHOWER_CONFIG, ...parsed.babyshower };
          isCustom = true;
        }
        memoryConfigCache = { targetDate, gender, mode, babyshower, isCustom };
        return {
          targetDate,
          targetTimeMs: new Date(targetDate).getTime(),
          gender,
          mode,
          babyshower,
          isCustom,
          storage: 'Local File'
        };
      }
    } catch (err) {}
  }

  // 4. In-Memory Cache
  if (memoryConfigCache) {
    return {
      targetDate: memoryConfigCache.targetDate,
      targetTimeMs: new Date(memoryConfigCache.targetDate).getTime(),
      gender: memoryConfigCache.gender,
      mode: memoryConfigCache.mode || DEFAULT_MODE,
      babyshower: memoryConfigCache.babyshower || { ...DEFAULT_BABYSHOWER_CONFIG },
      isCustom: memoryConfigCache.isCustom,
      storage: 'Memory Cache'
    };
  }

  return {
    targetDate,
    targetTimeMs: new Date(targetDate).getTime(),
    gender,
    mode,
    babyshower,
    isCustom,
    storage: 'Defaults'
  };
}

async function setActiveConfig(newConfig) {
  const current = await getActiveConfig();
  const updatedTargetDate = (newConfig.targetDate && !isNaN(new Date(newConfig.targetDate).getTime()))
    ? new Date(newConfig.targetDate).toISOString()
    : current.targetDate;

  const updatedMode = newConfig.mode ? normalizeMode(newConfig.mode) : current.mode;
  const updatedGender = newConfig.gender ? normalizeGender(newConfig.gender) : current.gender;
  const updatedBabyshower = (newConfig.babyshower && typeof newConfig.babyshower === 'object')
    ? { ...current.babyshower, ...newConfig.babyshower }
    : current.babyshower;

  const updated = {
    targetDate: updatedTargetDate,
    gender: updatedGender,
    mode: updatedMode,
    babyshower: updatedBabyshower,
    isCustom: true,
    updatedAt: new Date().toISOString()
  };

  memoryConfigCache = updated;

  // 1. Supabase
  await supabaseRequest('babyparty_config', {
    method: 'POST',
    headers: {
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify({
      key: 'app_config',
      value: updated,
      updated_at: new Date().toISOString()
    })
  });

  // 2. Upstash KV
  await kvExecute(['SET', 'baby_reveal_config', JSON.stringify(updated)]);
  await kvExecute(['SET', 'baby_countdown_date', updated.targetDate]);

  // 3. File System
  const candidateFiles = [PRIMARY_CONFIG_FILE, TMP_CONFIG_FILE];
  for (const filePath of candidateFiles) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
      break;
    } catch (err) {}
  }

  return {
    ...updated,
    targetTimeMs: new Date(updated.targetDate).getTime()
  };
}

async function resetActiveConfig() {
  memoryConfigCache = null;

  await supabaseRequest('babyparty_config?key=eq.app_config', { method: 'DELETE' });
  await kvExecute(['DEL', 'baby_reveal_config']);
  await kvExecute(['DEL', 'baby_countdown_date']);

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

// ----------------- RSVPS MANAGEMENT -----------------
function readLocalRsvps() {
  const candidateFiles = [PRIMARY_RSVP_FILE, TMP_RSVP_FILE];
  for (const filePath of candidateFiles) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
  }
  return memoryRsvpsCache || [];
}

function writeLocalRsvps(list) {
  memoryRsvpsCache = list;
  const candidateFiles = [PRIMARY_RSVP_FILE, TMP_RSVP_FILE];
  for (const filePath of candidateFiles) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
      break;
    } catch (e) {}
  }
}

const KV_RSVPS_KEY = 'babyparty:rsvps:v1';

async function readKvRsvps() {
  const raw = await kvExecute(['GET', KV_RSVPS_KEY]);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('[DevStore] Invalid KV RSVPs JSON:', e.message);
    return [];
  }
}

async function writeKvRsvps(list) {
  const res = await kvExecute(['SET', KV_RSVPS_KEY, JSON.stringify(Array.isArray(list) ? list : [])]);
  if (res === null) {
    throw new Error('KV-Speicherung der Rückmeldungen fehlgeschlagen.');
  }
}

async function saveRsvp({ id, name, plusOnes, attending, note }) {
  const cleanName = String(name || '').trim();
  if (!cleanName) {
    throw new Error('Name ist erforderlich.');
  }

  const cleanPlusOnes = Array.isArray(plusOnes)
    ? plusOnes.map(p => String(p || '').trim()).filter(Boolean)
    : [];
  const totalPersons = 1 + cleanPlusOnes.length;
  const isAttending = Boolean(attending);
  const cleanNote = note ? String(note).trim() : '';

  const rsvpPayload = {
    name: cleanName,
    plus_ones: cleanPlusOnes,
    total_persons: totalPersons,
    attending: isAttending,
    note: cleanNote
  };

  // 1. Primary: Supabase (strictly throw on errors when configured so we never silently lose RSVPs)
  if (getSupabaseConfig()) {
    if (id) {
      const sbUpdate = await supabaseRequest(`babyparty_rsvps?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Prefer': 'return=representation' },
        body: JSON.stringify({
          ...rsvpPayload,
          updated_at: new Date().toISOString()
        }),
        throwOnError: true
      });
      if (Array.isArray(sbUpdate) && sbUpdate.length > 0) {
        return sbUpdate[0];
      }
      // If ID was deleted on server, fall through cleanly to insert a fresh entry
    }

    const sbResult = await supabaseRequest('babyparty_rsvps', {
      method: 'POST',
      headers: {
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(rsvpPayload),
      throwOnError: true
    });

    if (Array.isArray(sbResult) && sbResult.length > 0) {
      return sbResult[0];
    }
    throw new Error('Supabase hat keinen gespeicherten Eintrag zurückgegeben.');
  }

  // 2. Secondary: Upstash KV (if configured without Supabase)
  if (getKvConfig()) {
    const kvList = await readKvRsvps();
    const existingIndex = id ? kvList.findIndex(e => String(e.id) === String(id)) : -1;
    if (existingIndex >= 0) {
      kvList[existingIndex] = {
        ...kvList[existingIndex],
        ...rsvpPayload,
        updated_at: new Date().toISOString()
      };
      await writeKvRsvps(kvList);
      return kvList[existingIndex];
    }

    const newKvEntry = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...rsvpPayload
    };
    kvList.unshift(newKvEntry);
    await writeKvRsvps(kvList);
    return newKvEntry;
  }

  // 3. Local Dev Fallback (only when neither Supabase nor KV is configured)
  const localList = readLocalRsvps();
  const existingIndex = id ? localList.findIndex(e => String(e.id) === String(id)) : -1;

  if (existingIndex >= 0) {
    localList[existingIndex] = {
      ...localList[existingIndex],
      ...rsvpPayload,
      updated_at: new Date().toISOString()
    };
    writeLocalRsvps(localList);
    return localList[existingIndex];
  }

  const newEntry = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...rsvpPayload
  };
  localList.unshift(newEntry);
  writeLocalRsvps(localList);

  return newEntry;
}

async function getRsvps() {
  let list = [];

  if (getSupabaseConfig()) {
    const sbRows = await supabaseRequest('babyparty_rsvps?select=*&order=created_at.desc', {
      throwOnError: true
    });
    list = Array.isArray(sbRows) ? sbRows : [];
  } else if (getKvConfig()) {
    list = await readKvRsvps();
  } else {
    list = readLocalRsvps();
  }

  // Calculate summary stats
  let attendingResponses = 0;
  let declinedResponses = 0;
  let totalAttendingGuests = 0;
  let totalDeclinedGuests = 0;

  for (const r of list) {
    const count = Number(r.total_persons) || (1 + (Array.isArray(r.plus_ones) ? r.plus_ones.length : 0));
    if (r.attending) {
      attendingResponses++;
      totalAttendingGuests += count;
    } else {
      declinedResponses++;
      totalDeclinedGuests += count;
    }
  }

  return {
    rsvps: list,
    stats: {
      totalResponses: list.length,
      attendingResponses,
      declinedResponses,
      totalAttendingGuests,
      totalDeclinedGuests,
      totalGuestsOverall: totalAttendingGuests
    }
  };
}

async function deleteRsvp(id) {
  if (!id) return false;

  if (getSupabaseConfig()) {
    await supabaseRequest(`babyparty_rsvps?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      throwOnError: true
    });
    return true;
  }

  if (getKvConfig()) {
    const kvList = await readKvRsvps();
    const filtered = kvList.filter(item => String(item.id) !== String(id));
    await writeKvRsvps(filtered);
    return true;
  }

  const localList = readLocalRsvps();
  const filtered = localList.filter(item => String(item.id) !== String(id));
  writeLocalRsvps(filtered);

  return true;
}

module.exports = {
  DEFAULT_TARGET_DATE,
  DEFAULT_GENDER,
  DEFAULT_MODE,
  DEFAULT_BABYSHOWER_CONFIG,
  normalizeGender,
  normalizeMode,
  verifyDevToken,
  getSupabaseConfig,
  getKvConfig,
  getActiveConfig,
  setActiveConfig,
  resetActiveConfig,
  saveRsvp,
  getRsvps,
  deleteRsvp
};
