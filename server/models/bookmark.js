const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post is required']
  }
}, {
  timestamps: true
});

// Create compound index to ensure a user can only bookmark a post once
bookmarkSchema.index({ user: 1, post: 1 }, { unique: true });

// Index for faster queries
bookmarkSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
