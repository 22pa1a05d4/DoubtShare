// server/routes/search.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

router.get('/:query', async (req, res) => {
  const query = req.params.query.toLowerCase();

  const users = await User.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
    ]
  });

  const posts = await Post.find({
    $or: [
      { content: { $regex: query, $options: 'i' } },
      { tags: { $regex: query, $options: 'i' } },
    ]
  });

  res.json({ users, posts });
});

module.exports = router;
