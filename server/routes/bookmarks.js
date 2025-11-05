const express = require('express');
const router = express.Router();
const { toggleBookmark, checkBookmark, getUserBookmarks } = require('../controllers/bookmarkController');

// @desc    Toggle bookmark on a post
// @route   POST /api/posts/:postId/bookmark
// @access  Private
router.post('/posts/:postId/bookmark', toggleBookmark);

// @desc    Check if post is bookmarked
// @route   GET /api/posts/:postId/bookmark
// @access  Public
router.get('/posts/:postId/bookmark', checkBookmark);

// @desc    Get all bookmarks for a user
// @route   GET /api/bookmarks
// @access  Private
router.get('/bookmarks', getUserBookmarks);

module.exports = router;
