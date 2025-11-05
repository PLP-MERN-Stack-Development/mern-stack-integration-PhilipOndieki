const Like = require('../models/like');
const User = require('../models/user');
const Post = require('../models/post');

// @desc    Toggle like on a post
// @route   POST /api/posts/:postId/like
// @access  Private
exports.toggleLike = async (req, res, next) => {
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

    // Check if like already exists
    const existingLike = await Like.findOne({
      post: postId,
      user: user._id
    });

    if (existingLike) {
      // Unlike - remove the like
      await Like.findByIdAndDelete(existingLike._id);
      
      // Get updated count
      const likeCount = await Like.countDocuments({ post: postId });
      
      return res.json({
        success: true,
        data: {
          liked: false,
          likeCount
        }
      });
    } else {
      // Like - create new like
      await Like.create({
        post: postId,
        user: user._id
      });
      
      // Get updated count
      const likeCount = await Like.countDocuments({ post: postId });
      
      return res.json({
        success: true,
        data: {
          liked: true,
          likeCount
        }
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    next(error);
  }
};

// @desc    Get like status and count for a post
// @route   GET /api/posts/:postId/likes
// @access  Public
exports.getPostLikes = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { clerkUserId } = req.query;

    // Get total like count
    const likeCount = await Like.countDocuments({ post: postId });

    // Check if current user has liked (if logged in)
    let liked = false;
    if (clerkUserId) {
      const user = await User.findOne({ clerkUserId });
      if (user) {
        const existingLike = await Like.findOne({
          post: postId,
          user: user._id
        });
        liked = !!existingLike;
      }
    }

    res.json({
      success: true,
      data: {
        likeCount,
        liked
      }
    });
  } catch (error) {
    console.error('Error getting likes:', error);
    next(error);
  }
};

// @desc    Get all likes by a user
// @route   GET /api/users/:userId/likes
// @access  Public
exports.getUserLikes = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const likes = await Like.find({ user: userId })
      .populate({
        path: 'post',
        select: 'title slug createdAt',
        populate: {
          path: 'author',
          select: 'username'
        }
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: likes
    });
  } catch (error) {
    console.error('Error getting user likes:', error);
    next(error);
  }
};