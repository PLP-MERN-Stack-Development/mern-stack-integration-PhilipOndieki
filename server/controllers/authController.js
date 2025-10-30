const User = require('../models/user');

// @desc    Sync user with Clerk
// @route   POST /api/auth/sync
// @access  Public
exports.syncUser = async (req, res, next) => {
  try {
    // Log the request body for debugging
    console.log('Received sync request:', JSON.stringify(req.body, null, 2));
    
    // Check if data object exists
    if (!req.body.data) {
      return res.status(400).json({
        success: false,
        error: 'Missing data object in request body'
      });
    }

    const { id, username, email_addresses, first_name, last_name, image_url } = req.body.data;

    // Validate required fields
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: id'
      });
    }

    if (!email_addresses || !Array.isArray(email_addresses) || email_addresses.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid email_addresses array'
      });
    }

    if (!email_addresses[0].email_address) {
      return res.status(400).json({
        success: false,
        error: 'Missing email_address in first email object'
      });
    }

    // Create user object
    const userData = {
      clerkUserId: id,
      username: username || email_addresses[0].email_address.split('@')[0], // fallback to email prefix
      email: email_addresses[0].email_address,
      firstName: first_name || '',
      lastName: last_name || '',
      profileImageUrl: image_url || '',
    };

    console.log('Creating/updating user with data:', userData);

    // Find and update or create user
    const user = await User.findOneAndUpdate(
      { clerkUserId: id },
      userData,
      { upsert: true, new: true, runValidators: true }
    );

    console.log('User synced successfully:', user);

    res.json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    console.error('Error in syncUser:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: Object.values(error.errors).map(e => e.message)
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'User with this email or username already exists'
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
};