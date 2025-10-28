const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    featuredImage: {
      type: String,
      default: '',
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Add text indexes for search functionality
postSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Post', postSchema);
