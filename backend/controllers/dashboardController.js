// backend/controllers/dashboardController.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Inquiry = require('../models/Inquiry');

// @desc  Get dashboard overview stats
// @route GET /api/dashboard/stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: {
          totalProducts: 0,
          totalCategories: 0,
          totalInquiries: 0,
          newInquiries: 0,
          recentInquiries: [],
        },
        source: 'unconnected',
      });
    }

    const [totalProducts, totalCategories, totalInquiries, newInquiries, recentInquiries] =
      await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        Inquiry.countDocuments(),
        Inquiry.countDocuments({ status: 'new' }),
        Inquiry.find()
          .sort({ createdAt: -1 })
          .limit(10)
          .populate('product', 'name imageUrl')
          .lean(),
      ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalInquiries,
        newInquiries,
        recentInquiries,
      },
    });
  } catch (err) {
    next(err);
  }
};
