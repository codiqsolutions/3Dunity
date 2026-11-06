// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @desc   Register a new admin (one-time setup)
// @route  POST /api/auth/register
// @access Public (should be disabled after first admin created)
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ message: 'Admin already exists' });
    admin = new Admin({ email });
    await admin.setPassword(password);
    await admin.save();
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    res.status(201).json({
      token,
      admin: { id: admin._id, email: admin.email, role: admin.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Login admin
// @route  POST /api/auth/login
// @access Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await admin.validatePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    res.json({
      token,
      admin: { id: admin._id, email: admin.email, role: admin.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Get current admin info
// @route  GET /api/auth/me
// @access Private
exports.getMe = async (req, res) => {
  if (!req.admin) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  res.json({
    admin: { id: req.admin._id, email: req.admin.email, role: req.admin.role },
  });
};

// @desc   Logout admin (clear cookie)
// @route  POST /api/auth/logout
// @access Private
exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
