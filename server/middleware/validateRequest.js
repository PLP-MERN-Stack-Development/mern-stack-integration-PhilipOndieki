const Joi = require('joi');

// Post validation schema
const postSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required'
    }),

  content: Joi.string()
    .trim()
    .min(10)
    .required()
    .messages({
      'string.empty': 'Content is required',
      'string.min': 'Content must be at least 10 characters long',
      'any.required': 'Content is required'
    }),
  clerkUserId: Joi.string()
    .required()
    .messages({
      'any.required': 'clerkUserId is required'
    }),
  category: Joi.string()
    .required()
    .messages({
      'any.required': 'Category is required'
    }),

  featuredImage: Joi.string()
    .uri()
    .allow('', null)
    .messages({
      'string.uri': 'Featured image must be a valid URL'
    }),

  tags: Joi.array()
    .items(Joi.string().trim())
    .max(10)
    .messages({
      'array.max': 'Cannot have more than 10 tags'
    }),

  isPublished: Joi.boolean()
    .default(false),

  clerkId: Joi.string()
    .allow('', null)
});

// Post update validation schema (all fields optional)
const postUpdateSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .messages({
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 200 characters'
    }),

  content: Joi.string()
    .trim()
    .min(10)
    .messages({
      'string.min': 'Content must be at least 10 characters long'
    }),

  category: Joi.string(),

  featuredImage: Joi.string()
    .uri()
    .allow('', null)
    .messages({
      'string.uri': 'Featured image must be a valid URL'
    }),

  tags: Joi.array()
    .items(Joi.string().trim())
    .max(10)
    .messages({
      'array.max': 'Cannot have more than 10 tags'
    }),

  isPublished: Joi.boolean()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Category validation schema
const categorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Category name is required',
      'string.min': 'Category name must be at least 2 characters long',
      'string.max': 'Category name cannot exceed 50 characters',
      'any.required': 'Category name is required'
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .allow('', null)
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    })
});

// Comment validation schema
const commentSchema = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Comment content is required',
      'string.min': 'Comment must not be empty',
      'string.max': 'Comment cannot exceed 1000 characters',
      'any.required': 'Comment content is required'
    }),

  author: Joi.string()
    .required()
    .messages({
      'any.required': 'Author is required'
    }),

  post: Joi.string()
    .required()
    .messages({
      'any.required': 'Post ID is required'
    }),

  clerkId: Joi.string()
    .allow('', null)
});

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true // Remove unknown fields
    });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    // Replace request body with validated and sanitized data
    req.body = value;
    next();
  };
};

// Export validation middleware for different routes
const validatePost = validate(postSchema);
const validatePostUpdate = validate(postUpdateSchema);
const validateCategory = validate(categorySchema);
const validateComment = validate(commentSchema);

module.exports = {
  validatePost,
  validatePostUpdate,
  validateCategory,
  validateComment,
  validate // Export factory for custom schemas
};
