// Vercel Serverless Function: Secure Reveal Gender
// Environment Variable: REVEAL_GENDER, DEV_PASSWORD

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

  try {
    // Reveal target: Donnerstag 29.10.2026, 18:00 Uhr Berlin time (CET UTC+1)
    const REVEAL_TIME_MS = new Date('2026-10-29T18:00:00+01:00').getTime();
    const isTimeReached = Date.now() >= REVEAL_TIME_MS;

    const finalGender = normalizeGender(process.env.REVEAL_GENDER || 'boy');

    const devToken = req.headers['x-dev-token'];
    const isDevAuthorized = (devToken === 'dev_auth_ok');

    // Deliver real gender if official countdown time is reached OR if authorized developer:
    if (isTimeReached || isDevAuthorized) {
      return res.status(200).json({
        unlocked: true,
        gender: finalGender,
        serverTime: new Date().toISOString()
      });
    }

    // Countdown still active and not authorized as developer: Keep gender secret!
    return res.status(200).json({
      unlocked: false,
      targetTime: '2026-10-29T18:00:00+01:00',
      serverTime: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({
      unlocked: false,
      error: 'Server error'
    });
  }
};
