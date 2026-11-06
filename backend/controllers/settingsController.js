// backend/controllers/settingsController.js
const mongoose = require('mongoose');
const WebsiteSettings = require('../models/WebsiteSettings');

const DEFAULT_SETTINGS = {
  businessName: '3D Unity',
  tagline: 'Turning Creative Ideas Into 3D Reality',
  email: '3duniti1@gmail.com',
  phone: '+91 88669 61005',
  whatsappNumber: '918866961005',
  address: '215 Apple Square, Yogi Chowk, Surat, Gujarat 395010',
  workingHours: 'Mon - Sat: 10:00 AM - 7:00 PM | Sunday: Closed',
  instagramUrl: '',
  youtubeUrl: '',
  deliveryFee: '60',
  heroHeading: 'Bring Your Ideas to Life in 3D',
  heroSubheading: 'High-quality, customizable 3D models for personal, professional and business needs.',
  metaTitle: '3D Unity — Premium 3D Printing in Surat',
  metaDescription: 'Custom 3D printed products, models and prototypes. High precision. Multiple materials. Pan India delivery.',
};

// @desc  Get website settings (public)
// @route GET /api/settings
exports.getSettings = async (req, res, next) => {
  try {
    // If MongoDB is not connected yet, immediately return sensible defaults
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: DEFAULT_SETTINGS, source: 'default' });
    }

    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = DEFAULT_SETTINGS;
    }
    res.json({ success: true, data: settings, source: 'database' });
  } catch (err) {
    // Fallback to default if query fails so website header/footer never break
    res.json({ success: true, data: DEFAULT_SETTINGS, source: 'fallback' });
  }
};

// @desc  Update website settings (admin)
// @route PUT /api/settings
exports.updateSettings = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure your MongoDB credentials in backend/.env',
      });
    }

    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json({ success: true, data: settings, message: 'Settings updated.' });
  } catch (err) {
    next(err);
  }
};
