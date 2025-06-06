
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  college: String,
  branch: String,
  semester: Number,
  profilePhoto: {
  type: String, // base64 string
  default: ''
}

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
