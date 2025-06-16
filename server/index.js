const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // For accessing environment variables
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const notifRoutes = require('./routes/notifications');
const User = require('./models/User')

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' })); // ✅ allow up to 5 MB JSON
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notifRoutes);
// serves files like http://localhost:5000/uploads/abc.jpg
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://127.0.0.1:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
app.listen(5000, () => console.log('Server running on port 5000'));
