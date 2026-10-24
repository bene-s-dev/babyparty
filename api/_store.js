// Secure server-side store for dev configuration overrides
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CONFIG_FILE = path.join(__dirname, '..', '.dev-runtime-config.json');

// Default target: Donnerstag 29.10.2026, 18:00 Uhr Berlin time (CET UTC+1)
const DEFAULT_TARGET_DATE = '2026-10-29T18:00:00+01:00';

function normalizeGender(val) {
  if (!val) return 'boy';
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

function getActiveConfig() {
  let targetDate = DEFAULT_TARGET_DATE;
  let gender = normalizeGender(process.env.REVEAL_GENDER || 'boy');
  let isCustom = false;

  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const raw = fs.readFileSync(CONFIG_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed.targetDate && !isNaN(new Date(parsed.targetDate).getTime())) {
        targetDate = parsed.targetDate;
        isCustom = true;
      }
      if (parsed.gender) {
        gender = normalizeGender(parsed.gender);
        isCustom = true;
      }
    }
  } catch (err) {
    console.warn('[DevStore] Could not read runtime config:', err.message);
  }

  return {
    targetDate,
    targetTimeMs: new Date(targetDate).getTime(),
    gender,
    isCustom
  };
}

function setActiveConfig(newConfig) {
  const current = getActiveConfig();
  const updated = {
    targetDate: (newConfig.targetDate && !isNaN(new Date(newConfig.targetDate).getTime()))
      ? newConfig.targetDate
      : current.targetDate,
    gender: newConfig.gender ? normalizeGender(newConfig.gender) : current.gender,
    updatedAt: new Date().toISOString()
  };

  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2), 'utf8');
  } catch (err) {
    console.warn('[DevStore] Could not persist runtime config:', err.message);
  }

  return {
    ...updated,
    targetTimeMs: new Date(updated.targetDate).getTime()
  };
}

function resetActiveConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      fs.unlinkSync(CONFIG_FILE);
    }
  } catch (err) {
    console.warn('[DevStore] Could not reset runtime config:', err.message);
  }
  return getActiveConfig();
}

module.exports = {
  DEFAULT_TARGET_DATE,
  normalizeGender,
  verifyDevToken,
  getActiveConfig,
  setActiveConfig,
  resetActiveConfig
};
