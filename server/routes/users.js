const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create or get user
router.post('/', async (req, res) => {
  try {
    const { clerkUserId, email, username } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ clerkUserId });
    
    if (!user) {
      // Create new user
      user = await User.create({ clerkUserId, email, username });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;