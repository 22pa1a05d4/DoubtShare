// // const multer = require('multer');
// // const path = require('path');

// // // Define storage
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'uploads/'); // Save files in 'uploads/' directory
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
// //   }
// // });

// // // Export configured multer
// // const upload = multer({ storage: storage });
// // module.exports = upload;


// // server/middleware/upload.js
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;

// require('dotenv').config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key:    process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'doubtshare_uploads',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//   },
// });

// const upload = multer({ storage });
// module.exports = upload;

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // ✅ use correct key
  api_key: process.env.CLOUDINARY_API_KEY,         // ✅ match .env
  api_secret: process.env.CLOUDINARY_API_SECRET,   // ✅ match .env
});

console.log('📸 Cloudinary setup:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'doubtshare',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage });
module.exports = upload;
