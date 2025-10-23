const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST api/auth/sync
// @desc    Sync user with Clerk
// @access  Public
router.post('/sync', authController.syncUser);

module.exports = router;
