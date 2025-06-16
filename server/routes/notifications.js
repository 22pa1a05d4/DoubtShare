const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

/* GET unread notifications */
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email }, 'notifications');
    if (!user) return res.json([]);
    const unread = user.notifications.filter(n => !n.read);
    res.json(unread);
  } catch (err) {
    console.error('Notif fetch error', err);
    res.status(500).send('Server error');
  }
});

/* POST mark notifications as read */
router.post('/mark-read/:email', async (req, res) => {
  const { email } = req.params;
  try {
    await User.updateOne(
      { email },
      { $set: { 'notifications.$[].read': true } }
    );
    res.sendStatus(200);
  } catch (err) {
    console.error('Mark read error', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
