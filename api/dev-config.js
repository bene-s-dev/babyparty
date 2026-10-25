// Vercel Serverless Function: Developer Reveal Configuration (Secure Date & Gender)
const { verifyDevToken, getActiveConfig, setActiveConfig, resetActiveConfig, getKvConfig } = require('./_store');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-dev-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const devToken = req.headers['x-dev-token'];
  if (!verifyDevToken(devToken)) {
    return res.status(401).json({
      success: false,
      error: 'Unautorisierter Zugriff. Gültiger Entwickler-Token erforderlich.'
    });
  }

  const kv = getKvConfig();
  const storageInfo = kv ? `Upstash Redis Cloud (${kv.source})` : 'Local Fallback / Temp Memory';

  if (req.method === 'GET') {
    const config = await getActiveConfig();
    return res.status(200).json({
      success: true,
      config: {
        targetDate: config.targetDate,
        targetTimeMs: config.targetTimeMs,
        gender: config.gender,
        isCustom: config.isCustom,
        storage: storageInfo,
        hasKv: Boolean(kv)
      },
      serverTime: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const { targetDate, gender } = body || {};
    const updated = await setActiveConfig({ targetDate, gender });

    return res.status(200).json({
      success: true,
      message: kv 
        ? `Erfolgreich dauerhaft in Upstash Redis (${kv.source}) gespeichert.` 
        : 'Dev-Konfiguration aktualisiert (Achtung: Kein Upstash aktiv, temporärer Speicher).',
      config: {
        targetDate: updated.targetDate,
        targetTimeMs: updated.targetTimeMs,
        gender: updated.gender,
        storage: storageInfo,
        hasKv: Boolean(kv)
      },
      serverTime: new Date().toISOString()
    });
  }

  if (req.method === 'DELETE') {
    const reset = await resetActiveConfig();
    return res.status(200).json({
      success: true,
      message: 'Dev-Konfiguration auf Standard zurückgesetzt.',
      config: reset,
      serverTime: new Date().toISOString()
    });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
};
