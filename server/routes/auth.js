
// const express = require('express');
// const bcrypt = require('bcrypt');
// const router = express.Router();
// const User = require('../models/User');

// // SIGNUP Route
// router.post('/signup', async (req, res) => {
//   const { name, email, password, college, branch, semester } = req.body;
//   try {
//     // Check for duplicate email
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).send('Email already registered');

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       college,
//       branch,
//       semester
//     });

//     await newUser.save();
//     res.status(201).send('User registered successfully');
//   } catch (err) {
//     console.error('Signup Error:', err.message);
//     res.status(500).send(`Error registering user: ${err.message}`);
//   }
// });

// // LOGIN Route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).send('Invalid email or password');

//     // Compare hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).send('Invalid email or password');

//     // Success
    
// res.status(200).json({ message: 'Login successful', email: user.email });

//   } catch (err) {
//     console.error('Login Error:', err.message);
//     res.status(500).send(`Server error: ${err.message}`);
//   }
// });

// // GET user profile by email
// router.get('/profile/:email', async (req, res) => {
//   const { email } = req.params;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).send('User not found');

//     const { name, college, branch } = user;
//     res.status(200).json({ name, college, branch });
//   } catch (err) {
//     console.error('Profile Fetch Error:', err.message);
//     res.status(500).send(`Error fetching user: ${err.message}`);
//   }
// });


// module.exports = router;








const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// SIGNUP Route
router.post('/signup', async (req, res) => {
  const { name, email, password, college, branch, semester ,profilePhoto} = req.body;
  try {
    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Email already registered');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      college,
      branch,
      semester,
      profilePhoto
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).send(`Error registering user: ${err.message}`);
  }
});

// LOGIN Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email or password');

    // Success
    
res.status(200).json({ message: 'Login successful', email: user.email });

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).send(`Server error: ${err.message}`);
  }
});
router.post('/follow', async (req, res) => {
  const { currentUserEmail, targetUserEmail } = req.body;
  if (currentUserEmail === targetUserEmail) return res.sendStatus(400);

  try {
    await User.updateOne(
      { email: currentUserEmail },
      { $addToSet: { following: targetUserEmail } }   // $addToSet avoids duplicates
    );
    res.sendStatus(200);
  } catch (err) {
    console.error('follow error', err);
    res.status(500).send('Server error');
  }
});
// GET user profile by email
router.get('/profile/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const { name, college, branch, profilePhoto } = user;
    const [firstName, ...rest] = name.split(' ');
    const lastName = rest.join(' ');

    res.status(200).json({ firstName, lastName, college, branch, profilePhoto });
  } catch (err) {
    console.error('Profile Fetch Error:', err.message);
    res.status(500).send(`Error fetching user: ${err.message}`);
  }
});


// POST /api/profile/photo/update
router.post('/profile/photo/update', async (req, res) => {
  const { email, profilePhoto } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { profilePhoto });
    if (!user) return res.status(404).send('User not found');
    res.status(200).send('Profile photo updated');
  } catch (err) {
    console.error('Update photo error:', err.message);
    res.status(500).send('Server error while updating photo');
  }
});

// POST /api/profile/photo/remove
router.post('/profile/photo/remove', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { profilePhoto: '' });
    if (!user) return res.status(404).send('User not found');
    res.status(200).send('Profile photo removed');
  } catch (err) {
    console.error('Remove photo error:', err.message);
    res.status(500).send('Server error while removing photo');
  }
});

// GET /api/auth/suggestions
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1, profilePhoto: 1 });

    const result = users.map(u => {
      const [firstName, ...rest] = u.name.split(' ');
      const lastName = rest.join(' ');
      return {
        email: u.email,
        profilePhoto: u.profilePhoto,
        firstName,
        lastName
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/following/:email', async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email }, 'following');
  res.json(user?.following || []);
});
// POST /api/auth/unfollow
router.post('/unfollow', async (req, res) => {
  const { currentUserEmail, targetUserEmail } = req.body;

  try {
    await User.updateOne(
      { email: currentUserEmail },
      { $pull: { following: targetUserEmail } }
    );
    res.sendStatus(200);
  } catch (err) {
    console.error('unfollow error', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
