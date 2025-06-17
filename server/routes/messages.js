// // server/routes/messages.js
// const express = require('express');
// const router = express.Router();

// let messages = {}; // { 'userA_userB': [ {sender, text, time}, ... ] }

// const getChatId = (user1, user2) => {
//   return [user1, user2].sort().join('_'); // consistent chat key
// };

// // Get chat history
// router.get('/:user1/:user2', (req, res) => {
//   const chatId = getChatId(req.params.user1, req.params.user2);
//   res.json(messages[chatId] || []);
// });

// // Post new message
// router.post('/', (req, res) => {
//   const { sender, receiver, text } = req.body;
//   const chatId = getChatId(sender, receiver);
//   if (!messages[chatId]) messages[chatId] = [];
//   messages[chatId].push({ sender, text, time: new Date() });
//   res.status(201).json({ success: true });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// ✅ Get chat history between 2 users
router.get('/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;

  const chatMessages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort({ time: 1 });

  res.json(chatMessages);
});

// ✅ Post new message
router.post('/', async (req, res) => {
  const { sender, receiver, text } = req.body;
  const newMsg = new Message({ sender, receiver, text, time: new Date() });
  await newMsg.save();
  res.status(201).json(newMsg);
});

// ✅ Get all users a person has chatted with
router.get('/chats/:userEmail', async (req, res) => {
  const { userEmail } = req.params;

  const messages = await Message.find({
    $or: [{ sender: userEmail }, { receiver: userEmail }]
  });

  const userSet = new Set();
  messages.forEach(msg => {
    if (msg.sender !== userEmail) userSet.add(msg.sender);
    if (msg.receiver !== userEmail) userSet.add(msg.receiver);
  });

  res.json([...userSet]);
});

module.exports = router;
