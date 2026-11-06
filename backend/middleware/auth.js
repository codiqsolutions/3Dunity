// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Protect routes – verify JWT from Authorization header or cookie
exports.protect = async (req, res, next) => {
  let token;

  // 1. Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  // 2. Fallback to cookie
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-passwordHash');
    if (!req.admin) {
      return res.status(401).json({ message: 'Not authorized, admin not found' });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

// Authorize based on role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({ message: 'Forbidden – insufficient rights' });
    }
    next();
  };
};
