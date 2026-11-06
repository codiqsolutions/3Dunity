// backend/src/routes/upload.js
const express = require('express');
const multer = require('multer');
const { uploadFromBuffer, deleteByPublicId } = require('../utils/cloudinary');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Use memory storage – files are uploaded directly to Cloudinary without being saved on disk
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit per file
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type'), false);
  },
});

// Admin upload endpoint – returns Cloudinary URL(s)
router.post('/', protect, authorize('admin'), upload.array('images', 10), async (req, res) => {
  try {
    const urls = [];
    for (const file of req.files) {
      const url = await uploadFromBuffer(file.buffer);
      urls.push(url);
    }
    res.json({ urls });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;

