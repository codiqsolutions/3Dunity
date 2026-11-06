const mongoose = require('mongoose');
const Category = require('../models/Category');

// @desc   Get all categories
// @route  GET /api/categories
// @access Public
exports.getCategories = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Create category
// @route  POST /api/categories
// @access Private/Admin
exports.createCategory = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    const { name, slug, description, imageUrl } = req.body;
    const category = new Category({
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      imageUrl,
    });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// @desc   Delete category
// @route  DELETE /api/categories/:id
// @access Private/Admin
exports.deleteCategory = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
