// backend/routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const { uploadImage } = require('../controllers/uploadController');

// Store file in memory buffer (Cloudinary streams it directly)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'), false);
    }
  },
});

router.post('/', protect, upload.single('image'), uploadImage);

module.exports = router;

