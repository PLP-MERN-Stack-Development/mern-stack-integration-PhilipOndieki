const Post = require('../models/post');
const User = require('../models/user');


// @desc    Get all posts with search and pagination
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res, next) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    
    // Build query
    let query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category) {
      query.category = category;
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const posts = await Post.find(query)
      .populate('author', 'username email')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await Post.countDocuments(query);
    
    res.json({ 
      success: true, 
      data: posts,
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

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email')
      .populate('category', 'name');
      
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    next(error);
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
  try {
    const { clerkUserId, ...postData } = req.body;

    // Find user by clerkUserId
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    const post = await Post.create({
      ...postData,
      author: user._id
    });
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username email')
      .populate('category', 'name');
    res.status(201).json({ success: true, data: populatedPost });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        error: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {
        new: true,
        runValidators: true,
      }
    ).populate('author', 'username email')
     .populate('category', 'name');
     
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        error: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    next(error);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.json({ success: true, data: {}, message: 'Post deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    next(error);
  }
};