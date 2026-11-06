// backend/models/Inquiry.js
const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true, lowercase: true },
    inquiryType: {
      type: String,
      enum: ['product', 'custom', 'service', 'general'],
      default: 'general',
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    productName: { type: String, default: '' },
    preferredSize: { type: String, default: '' },
    preferredColour: { type: String, default: '' },
    quantity: { type: Number, default: 1, min: 1 },
    message: { type: String, default: '' },
    referenceImageUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'completed', 'closed'],
      default: 'new',
    },
    adminNote: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);

