const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
} = require('../controllers/inquiryController');

const router = express.Router();

router.post('/', createInquiry);
router.get('/', protect, authorize('admin'), getInquiries);
router.put('/:id/status', protect, authorize('admin'), updateInquiryStatus);

module.exports = router;

