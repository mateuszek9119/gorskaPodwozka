// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Konfiguracja Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfiguracja Storage dla Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tripImages', // 📂 folder w Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

// Multer middleware
const upload = multer({ storage });

module.exports = { cloudinary, upload };
