// server/models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  media:     { type: String },             // ✅ Optional base64 (image/audio/video)
  mimeType:  { type: String }, 
    originalName: { type: String },
  time: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Message', messageSchema);
