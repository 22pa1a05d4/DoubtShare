
// // server/routes/posts.js
// const express = require('express');
// const router  = express.Router();
// const upload  = require('../middleware/upload');
// const Post    = require('../models/Post');

// /* Helper: prepend public path if a file exists */
// const makeUrl = (fn) => (fn ? `/uploads/${fn}` : null);

// /* ───────────────────────────────
//    CREATE POST  (text + optional img)
// ──────────────────────────────── */
// router.post('/create', upload.single('image'), async (req, res) => {
//   try {
//     const { description, email } = req.body;
//     const filename = req.file ? req.file.filename : null;

//     const post = new Post({
//       description,
//       email,
//       imageUrl: makeUrl(filename), // store `/uploads/xxx.jpg`
//       comments : [],               // empty array
//     });

//     await post.save();
//     res.status(201).send('Post created successfully!');
//   } catch (err) {
//     console.error('Post creation error:', err);
//     res.status(500).send('Server Error');
//   }
// });

// /* ───────────────────────────────
//    MY POSTS
// ──────────────────────────────── */
// router.get('/my-posts/:email', async (req, res) => {
//   try {
//     const posts = await Post.find({ email: req.params.email })
//                             .sort({ createdAt: -1 })
//                             .lean();
//     res.json(posts);
//   } catch (err) {
//     console.error('Error fetching my posts:', err);
//     res.status(500).send('Error fetching your posts');
//   }
// });

// /* ───────────────────────────────
//    FEED (others’ posts)
// ──────────────────────────────── */
// router.get('/feed/:email', async (req, res) => {
//   const { email } = req.params;
//   try {
//     const posts = await Post.find({ email: { $ne: email } })
//                             .sort({ createdAt: -1 })
//                             .lean();
//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error while loading feed');
//   }
// });

// /* ───────────────────────────────
//    ADD COMMENT
// ──────────────────────────────── */
// router.post('/:postId/comment', async (req, res) => {
//   const { postId }          = req.params;
//   const { commenterEmail, text } = req.body;  // same POST body name as before

//   try {
//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).send('Post not found');

//     const comment = { user: commenterEmail, text };
//     post.comments.push(comment);
//     await post.save();

//     res.status(200).json(comment);   // return the new comment
//   } catch (err) {
//     console.error('Error adding comment:', err);
//     res.status(500).send('Failed to add comment');
//   }
// });

// router.delete('/:id', async (req, res) => {
//   const { id }   = req.params;
//   const { email } = req.body;     // send current user email in body

//   try {
//     const post = await Post.findById(id);
//     if (!post) return res.status(404).send('Post not found');

//     // Security: only the owner can delete
//     if (post.email !== email) return res.status(403).send('Not your post');

//     await post.deleteOne();
//     res.status(200).send('Deleted');
//   } catch (err) {
//     console.error('Delete error', err);
//     res.status(500).send('Failed to delete');
//   }
// });

// module.exports = router;





// server/routes/posts.js
const express  = require('express');
const router   = express.Router();
const upload   = require('../middleware/upload');
console.log('✅ Upload middleware loaded from:', require.resolve('../middleware/upload'));

const Post     = require('../models/Post');
const User = require('../models/User'); // ✅ Add this


/* Helper: turn filename → public URL fragment */
// const makeUrl = (fn) => (fn ? `/uploads/${fn}` : null);

router.post('/save/:email', async (req, res) => {
  const { email } = req.params;
  const { postId } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Saving postId:', postId, 'for user:', user.email);

    if (!user.savedPosts.includes(postId)) {
      user.savedPosts.push(postId);
      await user.save();
    }

    res.status(200).json({ message: 'Post saved' });
  } catch (err) {
    console.error('Save post error:', err);
    res.status(500).json({ message: 'Failed to save post' });
  }
});


// 🔥 Get saved posts
router.get('/saved/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).populate('savedPosts');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const posts = user.savedPosts;

    // 🔥 Fetch author data
    const uniqueEmails = [...new Set(posts.map(p => p.email))];
    const authors = await User.find({ email: { $in: uniqueEmails } }).lean();
    const byEmail = {};
    authors.forEach(u => {
      byEmail[u.email] = u;
    });

    const enriched = posts.map(p => ({
      ...p.toObject(),
      author: {
        name: (user.name || 'User').split(' ')[0],
        branch: byEmail[p.email]?.branch || ''
      },
      tags: p.tags || [],
      subject: p.subject || ''
    }));
    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch saved posts' });
  }
});
// router.post('/create', upload.single('image'), async (req, res) => {
//   console.log('req.file:', req.file);
//   const { title, description, email, tags } = req.body;
//   const imageUrl = req.file?.path || null; // ← Cloudinary URL

//   const post = new Post({
//     title,
//     description,
//     email,
//     tags: tags?.split(',').map(t => t.trim()) || [],
//     imageUrl,
//     comments: [],
//   });

//   await post.save();
//   res.status(201).send('Post created successfully!');
// });


// router.post('/create', upload.single('image'), async (req, res) => {
//   try {
//      console.log('Received:', req.body);
//     const { title,description, email,tags } = req.body;
//     const filename = req.file ? req.file.filename : null;

//     const post = new Post({
//       title,
//       description,
//       email,
//        tags: tags?.split(',').map(t => t.trim()) || [],
//       imageUrl: makeUrl(filename),
//       comments: [],
//     });

//     await post.save();
//     res.status(201).send('Post created successfully!');
//   } catch (err) {
//     console.error('Post creation error:', err);
//     res.status(500).send('Server Error');
//   }
// });
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    console.log('🔥 /create route HIT');
    console.log('📦 Uploaded file:', req.file);

    const { title, description, email, tags } = req.body;
    const imageUrl = req.file?.path || null;

    const post = new Post({
      title,
      description,
      email,
      tags: tags?.split(',').map(t => t.trim()) || [],
      imageUrl,
      comments: [],
    });

    await post.save();
    res.status(201).send('Post created successfully!');
  } catch (err) {
    console.error('❌ Error in /create route:', err);
    res.status(500).json({ error: err.message });
  }
});

// router.post('/create', upload.single('image'), async (req, res) => {
//   console.log('🔥 /create route HIT');
//   console.log('📦 Uploaded file:', req.file);

//   // console.log('📦 Uploaded file:', req.file);
//   // console.log('🧭 Storage path:', req.file?.path);
//   // console.log('🧾 Full file object:', JSON.stringify(req.file, null, 2));
//   // console.log('📦 Uploaded file object:', JSON.stringify(req.file, null, 2));

//   const { title, description, email, tags } = req.body;
//   const imageUrl = req.file?.path || null;

//   const post = new Post({
//     title,
//     description,
//     email,
//     tags: tags?.split(',').map(t => t.trim()) || [],
//     imageUrl,
//     comments: [],
//   });

//   await post.save();
//   res.status(201).send('Post created successfully!');
// });


router.get('/isSaved/:email/:postId', async (req, res) => {
  const { email, postId } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ saved: false });

    const isSaved = user.savedPosts.includes(postId);
    res.json({ saved: isSaved });
  } catch (err) {
    console.error('Error checking saved status:', err);
    res.status(500).json({ saved: false });
  }
});

// Unsave post
router.post('/unsave/:email', async (req, res) => {
  const { email } = req.params;
  const { postId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId);
    await user.save();

    res.status(200).json({ message: 'Post unsaved' });
  } catch (err) {
    console.error('Unsave error:', err);
    res.status(500).json({ message: 'Failed to unsave post' });
  }
});

// router.get('/my-posts/:email', async (req, res) => {
//   try {
//     const posts = await Post.find({ email: req.params.email })
//                             .sort({ createdAt: -1 })
//                             .lean();
//     res.json(posts);
//   } catch (err) {
//     console.error('Error fetching my posts:', err);
//     res.status(500).send('Error fetching your posts');
//   }
// });

router.get('/my-posts/:email', async (req, res) => {
  try {
    const posts = await Post.find({ email: req.params.email })
                            .sort({ createdAt: -1 })
                            .lean();

    const User = require('../models/User');
    const user = await User.findOne({ email: req.params.email }).lean();

    const enriched = posts.map(p => ({
      ...p,
      author: {
        name: (user.name || 'User').split(' ')[0],
        branch: user?.branch || ''
      },
      tags: p.tags || [],
      subject: p.subject || ''
    }));

    res.json(enriched);
  } catch (err) {
    console.error('Error fetching my posts:', err);
    res.status(500).send('Error fetching your posts');
  }
});

// router.get('/feed/:email', async (req, res) => {
//   const { email } = req.params;
//   try {
//     const posts = await Post.find({ email: { $ne: email } })
//                             .sort({ createdAt: -1 })
//                             .lean();
//     res.json(posts);
//   } catch (err) {
//     console.error('Feed fetch error:', err);
//     res.status(500).send('Server error while loading feed');
//   }
// });
// GET feed with author metadata

// router.get('/feed/:email', async (req, res) => {
//   const { email } = req.params;
//   try {
//     const posts = await Post.find({ email: { $ne: email } })
//       .sort({ createdAt: -1 })
//       .lean();

//     // 🔧 Add author info (branch, year, name)
//     const User = require('../models/User');
//     const users = await User.find({
//       email: { $in: posts.map(p => p.email) }
//     }).lean();

//     const byEmail = users.reduce((acc, u) => {
//       acc[u.email] = u; return acc;
//     }, {});

//     const enriched = posts.map(p => ({
//   ...p,
//   author: {
//     name: [
//       byEmail[p.email]?.firstName || '',
//       byEmail[p.email]?.lastName || ''
//     ].join(' ').trim() || 'User',
//     branch: byEmail[p.email]?.branch || ''
//     // ✅ Remove year
//   },
//   tags: p.tags || [],
//   subject: p.subject || ''
// }));


//     res.json(enriched);
//   } catch (err) {
//     console.error('Feed fetch error:', err);
//     res.status(500).send('Server error while loading feed');
//   }
// });
router.get('/feed/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const posts = await Post.find({ email: { $ne: email } })
      .sort({ createdAt: -1 })
      .lean();

    const User = require('../models/User');

    // Extract all emails from posts
    const uniqueEmails = [...new Set(posts.map(p => p.email))];

    const users = await User.find({ email: { $in: uniqueEmails } }).lean();

    const byEmail = {};
    users.forEach(u => {
      byEmail[u.email] = u;
    });

    const enriched = posts.map(p => {
      const user = byEmail[p.email] || {};
      return {
        ...p,
       author: {
  name: (user.name || 'User').split(' ')[0], // 👈 only first name
  branch: user.branch || ''
},
        tags: p.tags || [],
        subject: p.subject || ''
      };
    });

    res.json(enriched);
  } catch (err) {
    console.error('Feed fetch error:', err);
    res.status(500).send('Server error while loading feed');
  }
});



/* ───────────────────────────────
   ADD COMMENT  → returns new comment {user,text,createdAt}
──────────────────────────────── */
router.post('/:postId/comment', async (req, res) => {
  const { postId } = req.params;
  const { commenterEmail, text } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    const comment = { user: commenterEmail, text, createdAt: new Date() };
    post.comments.push(comment);
    await post.save();
    if (post.email !== commenterEmail) {
      const User = require('../models/User');
      await User.updateOne(
        { email: post.email },
        {
          $push: {
            notifications: {
              message: `${commenterEmail} answered your post`,
              postId: post._id,   
              read: false,
              createdAt: new Date()
            }
          }
        }
      );
    }

    res.status(200).json(comment);   // <- frontend appends this
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).send('Failed to add comment');
  }
});

/* ───────────────────────────────
   DELETE POST  (owner only)
──────────────────────────────── */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;   // owner email in body

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).send('Post not found');

    if (post.email !== email) return res.status(403).send('Not your post');

    await post.deleteOne();
    res.status(200).send('Deleted');
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).send('Failed to delete');
  }
});
router.get('/', (req, res) => res.send('Posts route is alive ✅'));

// routes/posts.js
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Not found');
    res.json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
});



module.exports = router;
