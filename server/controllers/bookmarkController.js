const Bookmark = require('../models/bookmark');
const User = require('../models/user');
const Post = require('../models/post');

// @desc    Toggle bookmark on a post
// @route   POST /api/posts/:postId/bookmark
// @access  Private
exports.toggleBookmark = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { clerkUserId } = req.body;

    // Validate post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    // Find user by clerkUserId
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found. Please sign in.'
      });
    }

    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({
      post: postId,
      user: user._id
    });

    if (existingBookmark) {
      // Remove bookmark
      await Bookmark.findByIdAndDelete(existingBookmark._id);

      return res.json({
        success: true,
        data: {
          bookmarked: false,
          message: 'Bookmark removed'
        }
      });
    } else {
      // Add bookmark
      await Bookmark.create({
        post: postId,
        user: user._id
      });

      return res.json({
        success: true,
        data: {
          bookmarked: true,
          message: 'Post bookmarked'
        }
      });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    next(error);
  }
};

// @desc    Check if post is bookmarked
// @route   GET /api/posts/:postId/bookmark
// @access  Public
exports.checkBookmark = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { clerkUserId } = req.query;

    let bookmarked = false;

    if (clerkUserId) {
      const user = await User.findOne({ clerkUserId });
      if (user) {
        const existingBookmark = await Bookmark.findOne({
          post: postId,
          user: user._id
        });
        bookmarked = !!existingBookmark;
      }
    }

    res.json({
      success: true,
      data: {
        bookmarked
      }
    });
  } catch (error) {
    console.error('Error checking bookmark:', error);
    next(error);
  }
};

// @desc    Get all bookmarks for a user
// @route   GET /api/bookmarks
// @access  Private
exports.getUserBookmarks = async (req, res, next) => {
  try {
    const { clerkUserId } = req.query;

    if (!clerkUserId) {
      return res.status(400).json({
        success: false,
        error: 'clerkUserId is required'
      });
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const bookmarks = await Bookmark.find({ user: user._id })
      .populate({
        path: 'post',
        populate: [
          { path: 'author', select: 'username email' },
          { path: 'category', select: 'name' }
        ]
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookmarks.length,
      data: bookmarks
    });
  } catch (error) {
    console.error('Error getting user bookmarks:', error);
    next(error);
  }
};
