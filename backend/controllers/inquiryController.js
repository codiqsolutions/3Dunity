const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');

// @desc   Create new inquiry
// @route  POST /api/inquiries
// @access Public
exports.createInquiry = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Inquiry service is currently offline. Please connect MongoDB or message us directly on WhatsApp.',
      });
    }
    const { name, phone, email, inquiryType, product, productName, preferredSize, preferredColour, quantity, message, referenceImage } = req.body;
    const inquiry = new Inquiry({
      name,
      phone,
      email,
      inquiryType: inquiryType || 'general',
      product,
      productName,
      preferredSize,
      preferredColour,
      quantity: quantity || 1,
      message,
      referenceImage,
    });
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry received successfully', inquiry });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// @desc   Get all inquiries
// @route  GET /api/inquiries
// @access Private/Admin
exports.getInquiries = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const inquiries = await Inquiry.find().populate('product', 'name slug').sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Update inquiry status
// @route  PUT /api/inquiries/:id/status
// @access Private/Admin
exports.updateInquiryStatus = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    const { status, adminNote } = req.body;
    const updateData = { status };
    if (adminNote !== undefined) updateData.adminNote = adminNote;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(inquiry);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};
