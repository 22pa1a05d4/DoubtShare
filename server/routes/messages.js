

// const express = require('express');
// const router = express.Router();
// const multer  = require('multer');
// const upload  = multer({ dest:'uploads/' });   
// const Message = require('../models/Message');

// // Get all users this person has chatted with, ordered by recent messages
// router.get('/chats/:email', async (req, res) => {
//   try {
//     const userEmail = req.params.email.toLowerCase();

//     const messages = await Message.find({
//       $or: [
//         { sender: new RegExp(`^${userEmail}$`, 'i') },
//         { receiver: new RegExp(`^${userEmail}$`, 'i') }
//       ]
//     }).sort({ time: -1 }); // sort by recent

//     const uniqueUsers = [];
//     const seen = new Set();

//     messages.forEach(msg => {
//       const otherEmail =
//         msg.sender.toLowerCase() === userEmail
//           ? msg.receiver.toLowerCase()
//           : msg.sender.toLowerCase();

//       if (!seen.has(otherEmail) && otherEmail !== userEmail) {
//         seen.add(otherEmail);
//         uniqueUsers.push(otherEmail);
//       }
//     });

//     res.json(uniqueUsers);
//   } catch (err) {
//     console.error('Error fetching chat users:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// router.post('/file', upload.single('file'), async (req,res)=>{
//   const { sender, receiver } = req.body;
//   const file = req.file;                                     // {filename, originalname, mimetype}
//   const msg  = new Message({
//     sender, receiver, type:'file',
//     url : `/uploads/${file.filename}`,
//     originalName:file.originalname,
//     mime:file.mimetype
//   });
//   await msg.save();
//   res.json(msg);                                             // front‑end will push
// });
// // Get messages between two users
// router.get('/:user1/:user2', async (req, res) => {
//   const { user1, user2 } = req.params;
//   const chatMessages = await Message.find({
//     $or: [
//       { sender: user1, receiver: user2 },
//       { sender: user2, receiver: user1 }
//     ]
//   }).sort({ time: 1 });

//   res.json(chatMessages);
// });

// // Send message
// router.post('/', async (req, res) => {
//   const { sender, receiver, text } = req.body;
//   const newMsg = new Message({ sender, receiver, text, time: new Date() });
//   await newMsg.save();
//   res.status(201).json(newMsg);
// });

// module.exports = router;


// server/routes/messages.js
const express  = require('express');
const path    = require('path');
const fs      = require('fs');
const router   = express.Router();
const multer   = require('multer');
// const upload   = multer({ dest: 'uploads/' });   // files land in /uploads
const Post     = require('../models/Post');
const Message  = require('../models/Message');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});
const upload = multer({ storage });
/* -------------------------------------------------
   Who have I chatted with?   GET /api/messages/chats/:email
--------------------------------------------------*/
router.get('/chats/:email', async (req, res) => {
  try {
    const me = req.params.email.toLowerCase();

    const msgs = await Message.find({
      $or: [
        { sender:   new RegExp(`^${me}$`, 'i') },
        { receiver: new RegExp(`^${me}$`, 'i') }
      ]
    }).sort({ time: -1 });

    const seen = new Set();
    const recent = [];

    msgs.forEach(m => {
      const other = m.sender.toLowerCase() === me ? m.receiver.toLowerCase()
                                                  : m.sender.toLowerCase();
      if (!seen.has(other)) {
        seen.add(other);
        recent.push(other);
      }
    });

    res.json(recent);
  } catch (err) {
    console.error('chat list error', err);
    res.status(500).send('Server error');
  }
});

/* -------------------------------------------------
   Thread between two users       GET /api/messages/:a/:b
--------------------------------------------------*/
router.get('/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;
  const thread = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort({ time: 1 });

  res.json(thread);
});

/* -------------------------------------------------
   Send TEXT                       POST /api/messages
   body: { sender, receiver, text }
--------------------------------------------------*/
router.post('/', async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    const msg = await Message.create({
      sender,
      receiver,
      text,
      type : 'text',
      time : new Date()
    });
    res.status(201).json(msg);
  } catch (err) {
    console.error('send text error', err);
    res.status(500).send('Server error');
  }
});

/* -------------------------------------------------
   Send FILE                       POST /api/messages/file
   multipart‑form: file + sender + receiver
--------------------------------------------------*/
// router.post('/file', upload.single('file'), async (req, res) => {
//   try {
//     const { sender, receiver } = req.body;
//     const file = req.file;

//     if (!file) return res.status(400).json({ error: 'No file uploaded' });

//     const newMsg = new Message({
//       sender,
//       receiver,
//       text: '',
//       time: new Date(),
//       media: `/uploads/${file.filename}`,         // ⬅ URL to access
//       mimeType: file.mimetype,                    // ⬅ e.g. "image/png"
//       originalName: file.originalname,            // optional
//     });

//     const saved = await newMsg.save();
//     res.json(saved);
//   } catch (err) {
//     console.error('Upload failed:', err);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });
// --- POST  /api/messages/file  ----------------------------------
router.post('/file', upload.single('file'), async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    if (!req.file) return res.status(400).json({ error: 'No file' });

    /* build the public url – include the host right here
       so the front‑end can simply <img src={media}> */
    const mediaUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const msg = await Message.create({
      sender,
      receiver,
      text      : '',
      time      : new Date(),
      media     : mediaUrl,            // <– unified field
      mimeType  : req.file.mimetype,   // <– unified field
      originalName: req.file.originalname,
    });

    res.json(msg);
  } catch (err) {
    console.error('Upload failed', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});
router.post('/share-post', async (req, res) => {
  const { sender, postId, targets } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error:'Post not found' });

    /* build image url (or '') */
    const mediaURL = post.imageUrl
      ? `http://localhost:5000/uploads/${post.imageUrl.replace(/^\/?uploads\/?/, '')}`
      : '';

    /* create one message per receiver */
    await Promise.all(targets.map(email =>
      Message.create({
        sender,
        receiver : email,
        text     : post.description || '',
        media    : mediaURL,
        mimeType : mediaURL ? 'image/jpeg' : null,
        originalName: 'Shared post',
        time     : new Date()
      })
    ));

    res.json({ success:true });
  } catch (err) {
    console.error('share‑post error', err);
    res.status(500).json({ error:'Share failed' });
  }
});
router.post('/send', async (req, res) => {
  const { sender, receiver, text, media, mimeType } = req.body;

  try {
    const newMessage = new Message({ sender, receiver, text, media, mimeType });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Send message failed:', err);
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
});
module.exports = router;
