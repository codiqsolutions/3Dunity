// backend/src/models/Inquiry.js
const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    inquiryType: {
      type: String,
      enum: ['custom-print', 'bulk-order', 'general'],
      required: true,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // optional
    preferredSize: { type: String },
    preferredColour: { type: String },
    quantity: { type: Number, default: 1 },
    message: { type: String },
    referenceImage: { type: String }, // Cloudinary URL
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Completed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);

