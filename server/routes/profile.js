// server/routes/profile.js
const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

/* POST  /api/profile/photo/update
   body: { email, profilePhoto }
---------------------------------- */
router.post('/photo/update', async (req, res) => {
  const { email, profilePhoto } = req.body;
  try {
    await User.updateOne({ email }, { $set: { profilePhoto } });
    res.sendStatus(200);
  } catch (err) {
    console.error('photo update err', err);
    res.status(500).send('Server error');
  }
});

/* POST  /api/profile/photo/remove
   body: { email }
---------------------------------- */
router.post('/photo/remove', async (req, res) => {
  const { email } = req.body;
  try {
    await User.updateOne({ email }, { $set: { profilePhoto: '' } });
    res.sendStatus(200);
  } catch (err) {
    console.error('photo remove err', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
