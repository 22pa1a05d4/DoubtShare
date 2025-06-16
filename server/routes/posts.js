// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/upload');
// const Post = require('../models/Post');

// router.post('/create', upload.single('image'), async (req, res) => {
//   try {
//     const { description, email } = req.body;
//     const imageUrl = req.file ? req.file.filename : '';

//     const post = new Post({
//       description,
//       email,
//       imageUrl
//     });

//     await post.save();
//     res.status(201).send('Post created successfully!');
//   } catch (error) {
//     console.error('Post creation error:', error);
//     res.status(500).send('Server Error');
//   }
// });
// router.get('/my-posts/:email',async(req,res)=>{
//   try{
//     const posts=await Post.find({email:req.params.email}).sort({createdAt:-1});
//     res.json(posts);
//   }catch (err){
//     console.error('Error fetching posts:', err);
//   }
// });

// // routes/posts.js
// router.get('/feed/:email', async (req, res) => {
//   const { email } = req.params;

//   try {
//     const posts = await Post.find({ email: { $ne: email } })   // not my own
//                             .sort({ createdAt: -1 })           // newest first
//                             .lean();

//     res.json(posts);         // [{ _id, email, description, image, createdAt, ... }]
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error while loading feed');
//   }
// });

// module.exports = router;




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
const Post     = require('../models/Post');

/* Helper: turn filename → public URL fragment */
const makeUrl = (fn) => (fn ? `/uploads/${fn}` : null);

/* ───────────────────────────────
   CREATE POST  (text + optional img)
──────────────────────────────── */
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { description, email } = req.body;
    const filename = req.file ? req.file.filename : null;

    const post = new Post({
      description,
      email,
      imageUrl: makeUrl(filename),
      comments: [],
    });

    await post.save();
    res.status(201).send('Post created successfully!');
  } catch (err) {
    console.error('Post creation error:', err);
    res.status(500).send('Server Error');
  }
});

/* ───────────────────────────────
   MY POSTS
──────────────────────────────── */
router.get('/my-posts/:email', async (req, res) => {
  try {
    const posts = await Post.find({ email: req.params.email })
                            .sort({ createdAt: -1 })
                            .lean();
    res.json(posts);
  } catch (err) {
    console.error('Error fetching my posts:', err);
    res.status(500).send('Error fetching your posts');
  }
});

/* ───────────────────────────────
   FEED (others’ posts)
──────────────────────────────── */
router.get('/feed/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const posts = await Post.find({ email: { $ne: email } })
                            .sort({ createdAt: -1 })
                            .lean();
    res.json(posts);
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

module.exports = router;
