// backend/controllers/uploadController.js
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc  Upload image to Cloudinary
// @route POST /api/upload
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const folder = req.body.folder || '3dunity/products';
    const result = await uploadToCloudinary(req.file.buffer, folder);

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (err) {
    next(err);
  }
};

