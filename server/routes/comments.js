const express = require('express');
const router = express.Router();
const {
  getComments,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');
const { validateComment } = require('../middleware/validateRequest');

// Comments for a specific post
router.route('/posts/:postId/comments')
  .get(getComments)
  .post(validateComment, createComment);

// Individual comment operations
router.route('/comments/:id')
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
