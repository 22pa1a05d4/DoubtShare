

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
router.get('/chats/:email', async (req, res) => {
  try {
    const userEmail = req.params.email.toLowerCase();

    const messages = await Message.find({
      $or: [
        { sender: new RegExp(`^${userEmail}$`, 'i') },
        { receiver: new RegExp(`^${userEmail}$`, 'i') }
      ]
    });

    const uniqueUsers = new Set();

    messages.forEach(msg => {
      if (msg.sender.toLowerCase() !== userEmail) uniqueUsers.add(msg.sender.toLowerCase());
      if (msg.receiver.toLowerCase() !== userEmail) uniqueUsers.add(msg.receiver.toLowerCase());
    });

    res.json(Array.from(uniqueUsers));
  } catch (err) {
    console.error('Error fetching chat users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { sender, receiver, text } = req.body;
  const newMsg = new Message({ sender, receiver, text, time: new Date() });
  await newMsg.save();
  res.status(201).json(newMsg);
});

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


// ✅ Get all users this person has chatted with

module.exports = router;
