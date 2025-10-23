const User = require('../models/user');

// @desc    Sync user with Clerk
// @route   POST /api/auth/sync
// @access  Public
exports.syncUser = async (req, res, next) => {
  try {
    const { id, username, email_addresses, first_name, last_name, image_url } = req.body.data;

    const user = await User.findOneAndUpdate(
      { clerkUserId: id },
      {
        username: username,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        profileImageUrl: image_url,
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
