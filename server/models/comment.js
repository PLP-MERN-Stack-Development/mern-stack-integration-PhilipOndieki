const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post is required']
  },
  isEdited: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient queries
commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ author: 1 });

module.exports = mongoose.model('Comment', commentSchema);
