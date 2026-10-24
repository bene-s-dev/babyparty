// Vercel Serverless Function: Secure Reveal Gender
const { verifyDevToken, getActiveConfig } = require('./_store');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-dev-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const config = await getActiveConfig();
    const isTimeReached = Date.now() >= config.targetTimeMs;

    const devToken = req.headers['x-dev-token'];
    const isDevAuthorized = verifyDevToken(devToken);

    // Deliver real gender if official countdown time is reached OR if authorized developer:
    if (isTimeReached || isDevAuthorized) {
      return res.status(200).json({
        unlocked: true,
        gender: config.gender,
        targetTime: config.targetDate,
        targetTimeMs: config.targetTimeMs,
        serverTime: new Date().toISOString()
      });
    }

    // Countdown still active and not authorized as developer: Keep gender secret!
    return res.status(200).json({
      unlocked: false,
      targetTime: config.targetDate,
      targetTimeMs: config.targetTimeMs,
      serverTime: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({
      unlocked: false,
      error: 'Server error'
    });
  }
};
