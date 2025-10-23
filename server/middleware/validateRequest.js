const validatePost = (req, res, next) => {
  const { title, content, author, category } = req.body;
  
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Title is required' 
    });
  }
  
  if (!content || content.trim().length === 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Content is required' 
    });
  }
  
  if (!author) {
    return res.status(400).json({ 
      success: false, 
      error: 'Author is required' 
    });
  }
  
  if (!category) {
    return res.status(400).json({ 
      success: false, 
      error: 'Category is required' 
    });
  }
  
  next();
};

const validateCategory = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Category name is required' 
    });
  }
  
  next();
};

module.exports = { validatePost, validateCategory };