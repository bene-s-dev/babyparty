// Vercel Serverless Function: Developer Reveal & Babyshower Configuration
const { verifyDevToken, getActiveConfig, setActiveConfig, resetActiveConfig, getSupabaseConfig, getKvConfig } = require('./_store');

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

  const sb = getSupabaseConfig();
  const kv = getKvConfig();
  const storageInfo = sb 
    ? 'Supabase PostgreSQL Cloud' 
    : (kv ? `Upstash Redis Cloud (${kv.source})` : 'Lokale JSON-Datei / Cache');

  if (req.method === 'GET') {
    const config = await getActiveConfig();
    return res.status(200).json({
      success: true,
      config: {
        targetDate: config.targetDate,
        targetTimeMs: config.targetTimeMs,
        gender: config.gender,
        mode: config.mode || 'babyparty',
        babyshower: config.babyshower,
        isCustom: config.isCustom,
        storage: storageInfo,
        hasSupabase: Boolean(sb),
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

    const { targetDate, gender, mode, babyshower } = body || {};
    const updated = await setActiveConfig({ targetDate, gender, mode, babyshower });

    return res.status(200).json({
      success: true,
      message: `Konfiguration erfolgreich gespeichert (${storageInfo}).`,
      config: {
        targetDate: updated.targetDate,
        targetTimeMs: updated.targetTimeMs,
        gender: updated.gender,
        mode: updated.mode,
        babyshower: updated.babyshower,
        storage: storageInfo,
        hasSupabase: Boolean(sb),
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
