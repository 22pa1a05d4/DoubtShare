
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   college: String,
//   branch: String,
//   semester: Number,
//   profilePhoto: {
//   type: String, // base64 string
//   default: ''
// }

// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);





const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema(
  {
    message: String,   
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },     
    read:   { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }             // we don’t need a separate ObjectId for each
);

const UserSchema = new mongoose.Schema(
  {
    name:     String,
    email:    { type: String, unique: true },
    password: String,
    college:  String,
    branch:   String,
    semester: Number,

    profilePhoto: {
      type: String,          // base64 string
      default: ''
    },
     following: {
      type   : [String],
      default: []
    },
    notifications: {
      type: [NotificationSchema],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
