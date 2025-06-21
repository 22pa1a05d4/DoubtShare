const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String, // store image filename or full URL
    default: ''
  },
  email: {
    type: String,
    required: true
  },
 savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  comments: {
    type: [
      {
        user: String,
        text: String
      }
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
