const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');

// @desc    Get comments for a specific post
// @route   GET /api/posts/:postId/comments
// @access  Public
exports.getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    // Get comments for the post
    const comments = await Comment.find({ post: postId })
      .populate('author', 'username profileImageUrl')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Comment.countDocuments({ post: postId });

    res.json({
      success: true,
      data: comments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new comment
// @route   POST /api/posts/:postId/comments
// @access  Private (requires authentication)
exports.createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, clerkId } = req.body;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    // Find user by clerkId
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found. Please sign in.'
      });
    }

    // Create comment
    const comment = await Comment.create({
      content,
      author: user._id,
      post: postId
    });

    // Populate author info before sending response
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username profileImageUrl');

    res.status(201).json({
      success: true,
      data: populatedComment
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    next(error);
  }
};

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private (only comment author)
exports.updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, clerkId } = req.body;

    // Find the comment
    const comment = await Comment.findById(id).populate('author');
    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }

    // Find user by clerkId
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if user is the author of the comment
    if (comment.author._id.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'You are not authorized to update this comment'
      });
    }

    // Update comment
    comment.content = content;
    comment.isEdited = true;
    await comment.save();

    // Populate author info
    const updatedComment = await Comment.findById(comment._id)
      .populate('author', 'username profileImageUrl');

    res.json({
      success: true,
      data: updatedComment
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    next(error);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private (only comment author)
exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { clerkId } = req.body;

    // Find the comment
    const comment = await Comment.findById(id).populate('author');
    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }

    // Find user by clerkId
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if user is the author of the comment
    if (comment.author._id.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'You are not authorized to delete this comment'
      });
    }

    // Delete comment
    await Comment.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
