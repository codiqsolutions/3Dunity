// backend/src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    shortDescription: { type: String },
    images: [{ type: String }], // Cloudinary URLs
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number }, // optional
    sizes: [{ type: String }],
    colours: [{ type: String }],
    material: { type: String },
    customizationAvailable: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);

