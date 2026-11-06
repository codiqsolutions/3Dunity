// backend/controllers/productController.js
const mongoose = require('mongoose');
const Product = require('../models/Product');

// @desc   Get all products (public)
// @route  GET /api/products
// @access Public
exports.getProducts = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const products = await Product.find().populate('category', 'name slug');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Get single product by id (admin)
// @route  GET /api/products/id/:id
// @access Public or Admin
exports.getProductById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Get single product by slug (public)
// @route  GET /api/products/:slug
// @access Public
exports.getProductBySlug = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    const product = await Product.findOne({ slug: req.params.slug }).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Create new product (admin)
// @route  POST /api/products
// @access Private/Admin
exports.createProduct = async (req, res) => {
  const { name, slug, description, shortDescription, images, category, price, sizes, colours, material, customizationAvailable, featured, status } = req.body;
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    const product = new Product({ name, slug, description, shortDescription, images, category, price, sizes, colours, material, customizationAvailable, featured, status });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// @desc   Update product (admin)
// @route  PUT /api/products/:id
// @access Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// @desc   Delete product (admin)
// @route  DELETE /api/products/:id
// @access Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
