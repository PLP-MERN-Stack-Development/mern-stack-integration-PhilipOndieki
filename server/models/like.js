const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
}, {
  timestamps: true
});

// Compound index to ensure a user can only like a post once
likeSchema.index({ post: 1, user: 1 }, { unique: true });

// Index for efficient queries
likeSchema.index({ post: 1 });
likeSchema.index({ user: 1 });

module.exports = mongoose.model('Like', likeSchema);