const express = require('express');
const router = express.Router();
const User = require('../models/user');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get user by clerkUserId
// @route   GET /api/users/clerk/:clerkUserId
// @access  Public
router.get('/clerk/:clerkUserId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkUserId: req.params.clerkUserId });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Create or get user
// @route   POST /api/users
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { clerkUserId, email, username } = req.body;
    
    // Validate required fields
    if (!clerkUserId || !email || !username) {
      return res.status(400).json({
        success: false,
        error: 'Please provide clerkUserId, email, and username'
      });
    }
    
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
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'User with this email or username already exists'
      });
    }
    
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;