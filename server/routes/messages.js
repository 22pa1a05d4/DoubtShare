// server/routes/messages.js
const express = require('express');
const router = express.Router();

let messages = {}; // { 'userA_userB': [ {sender, text, time}, ... ] }

const getChatId = (user1, user2) => {
  return [user1, user2].sort().join('_'); // consistent chat key
};

// Get chat history
router.get('/:user1/:user2', (req, res) => {
  const chatId = getChatId(req.params.user1, req.params.user2);
  res.json(messages[chatId] || []);
});

// Post new message
router.post('/', (req, res) => {
  const { sender, receiver, text } = req.body;
  const chatId = getChatId(sender, receiver);
  if (!messages[chatId]) messages[chatId] = [];
  messages[chatId].push({ sender, text, time: new Date() });
  res.status(201).json({ success: true });
});

module.exports = router;
