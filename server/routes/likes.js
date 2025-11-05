const express = require('express');
const router = express.Router();
const { toggleLike, getPostLikes, getUserLikes } = require('../controllers/likeController');

// @desc    Toggle like on a post
// @route   POST /api/posts/:postId/like
// @access  Private
router.post('/posts/:postId/like', toggleLike);

// @desc    Get like status and count for a post
// @route   GET /api/posts/:postId/likes
// @access  Public
router.get('/posts/:postId/likes', getPostLikes);

// @desc    Get all likes by a user
// @route   GET /api/users/:userId/likes
// @access  Public
router.get('/users/:userId/likes', getUserLikes);

module.exports = router;
