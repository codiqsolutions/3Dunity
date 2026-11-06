// backend/models/WebsiteSettings.js
const mongoose = require('mongoose');

const websiteSettingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: '3D Unity' },
    tagline: { type: String, default: 'Turning Creative Ideas Into 3D Reality' },
    email: { type: String, default: '3duniti1@gmail.com' },
    phone: { type: String, default: '+91 88669 61005' },
    whatsappNumber: { type: String, default: '918866961005' },
    address: { type: String, default: '215 Apple Square, Yogi Chowk, Surat, Gujarat 395010' },
    workingHours: { type: String, default: 'Mon - Sat: 10:00 AM - 7:00 PM | Sunday: Closed' },
    instagramUrl: { type: String, default: '' },
    youtubeUrl: { type: String, default: '' },
    deliveryFee: { type: String, default: '60' },
    heroHeading: { type: String, default: 'Bring Your Ideas to Life in 3D' },
    heroSubheading: { type: String, default: 'High-quality, customizable 3D models for personal, professional and business needs.' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WebsiteSettings', websiteSettingsSchema);
