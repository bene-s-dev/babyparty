// Vercel Serverless Function: Developer Authentication
// Environment Variable: DEV_PASSWORD, REVEAL_GENDER

function normalizeGender(val) {
  if (!val) return 'boy';
  const clean = String(val).toLowerCase().trim();
  if (['girl', 'mädchen', 'maedchen', 'w', 'female'].includes(clean)) {
    return 'girl';
  }
  return 'boy';
}

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
    const hasEnvPassword = Boolean(process.env.DEV_PASSWORD && process.env.DEV_PASSWORD.trim());
    const configuredPassword = hasEnvPassword ? process.env.DEV_PASSWORD.trim() : null;
    const finalGender = normalizeGender(process.env.REVEAL_GENDER || 'boy');

    // Online with DEV_PASSWORD env variable set:
    // ONLY the secret DEV_PASSWORD from Vercel is accepted. baby2026 is REJECTED online.
    // If no DEV_PASSWORD is set at all (unconfigured / local), baby2026 is allowed as initial fallback.
    const isAuthorized = hasEnvPassword
      ? (submittedPassword === configuredPassword)
      : (submittedPassword === 'baby2026' || submittedPassword.toLowerCase() === 'baby2026');

    if (submittedPassword && isAuthorized) {
      return res.status(200).json({
        success: true,
        token: 'dev_auth_ok',
        gender: finalGender,
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
