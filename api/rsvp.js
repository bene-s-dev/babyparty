// Vercel Serverless Function: RSVP Submission & Protected Admin RSVP Management
const { verifyDevToken, saveRsvp, getRsvps, deleteRsvp } = require('./_store');

function isAuthorized(req) {
  const expectedPin = String(process.env.RESPONSES_PIN || process.env.ADMIN_PIN || '0801').trim();
  const headerPin = req.headers['x-pin'] || req.headers['x-admin-pin'];
  const queryPin = req.query ? req.query.pin : null;
  const authHeader = req.headers['authorization'] || '';
  const bearerPin = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  if (headerPin && String(headerPin).trim() === expectedPin) return true;
  if (queryPin && String(queryPin).trim() === expectedPin) return true;
  if (bearerPin && bearerPin === expectedPin) return true;

  return verifyDevToken(req);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-dev-token, x-pin, x-admin-pin');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST /api/rsvp: Public guest submission (Name, Plus-Ones, attending, note, optional id for edits)
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          body = {};
        }
      }

      const { id, name, plusOnes, attending, note } = body || {};
      if (!name || !String(name).trim()) {
        return res.status(400).json({
          success: false,
          error: 'Bitte gib deinen Namen ein.'
        });
      }

      const saved = await saveRsvp({
        id,
        name,
        plusOnes,
        attending,
        note
      });

      return res.status(200).json({
        success: true,
        message: attending 
          ? 'Deine Zusage wurde erfolgreich gespeichert! Wir freuen uns auf dich.' 
          : 'Deine Rückmeldung wurde gespeichert. Danke fürs Bescheid geben!',
        rsvp: saved
      });
    } catch (err) {
      console.error('[API rsvp POST Error]', err);
      return res.status(500).json({
        success: false,
        error: 'Fehler beim Speichern der Rückmeldung. Bitte versuche es erneut.'
      });
    }
  }

  // Protected operations: GET & DELETE require PIN 0801 or dev token
  if (!isAuthorized(req)) {
    return res.status(401).json({
      success: false,
      error: 'PIN erforderlich oder ungültig.'
    });
  }

  // GET /api/rsvp: Returns all RSVPs and statistics (for /antworten page & admin)
  if (req.method === 'GET') {
    try {
      const data = await getRsvps();
      return res.status(200).json({
        success: true,
        ...data
      });
    } catch (err) {
      console.error('[API rsvp GET Error]', err);
      return res.status(500).json({
        success: false,
        error: 'Fehler beim Laden der Gästeliste.'
      });
    }
  }

  // DELETE /api/rsvp: Delete RSVP by ID
  if (req.method === 'DELETE') {
    try {
      let id = req.query ? req.query.id : null;
      if (!id && req.url && req.url.includes('?')) {
        try {
          const urlParams = new URLSearchParams(req.url.split('?')[1]);
          id = urlParams.get('id');
        } catch (e) {}
      }
      if (!id && req.body) {
        let body = req.body;
        if (typeof body === 'string') {
          try { body = JSON.parse(body); } catch (e) {}
        }
        id = body ? body.id : null;
      }

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID des Eintrags fehlt.'
        });
      }

      await deleteRsvp(id);
      return res.status(200).json({
        success: true,
        message: 'Eintrag erfolgreich gelöscht.'
      });
    } catch (err) {
      console.error('[API rsvp DELETE Error]', err);
      return res.status(500).json({
        success: false,
        error: 'Fehler beim Löschen des Eintrags.'
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
};

