const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const path      = require('path');  
require('dotenv').config(); // For accessing environment variables
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const notifRoutes = require('./routes/notifications');
const messageRoutes = require('./routes/messages');
const searchRoutes =require('./routes/search');
const User = require('./models/User')
const PORT = process.env.PORT || 5000;
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' })); // ✅ allow up to 5 MB JSON
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/search',searchRoutes);
app.use('/api/notifications', notifRoutes);
// serves files like http://localhost:5000/uploads/abc.jpg
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


