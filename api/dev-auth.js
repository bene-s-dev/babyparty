// Vercel Serverless Function: Developer Authentication
const crypto = require('crypto');
const { getActiveConfig } = require('./_store');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-dev-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const submittedPassword = (body && body.password) ? String(body.password).trim() : '';
    const envPassword = process.env.DEV_PASSWORD ? process.env.DEV_PASSWORD.trim() : '';
    const activeConfig = await getActiveConfig();

    // DEV MODE STRICTLY PROTECTED BY ENV - NO FALLBACKS!
    if (!envPassword) {
      return res.status(403).json({
        success: false,
        error: 'Dev Mode nicht konfiguriert (DEV_PASSWORD fehlt in den Umgebungsvariablen)'
      });
    }

    if (submittedPassword && submittedPassword === envPassword) {
      const token = crypto.createHmac('sha256', envPassword).update('baby_dev_auth_session').digest('hex');
      return res.status(200).json({
        success: true,
        token: token,
        gender: activeConfig.gender,
        targetDate: activeConfig.targetDate,
        targetTimeMs: activeConfig.targetTimeMs,
        message: 'Developer options unlocked'
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Ungültiges Passwort'
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
