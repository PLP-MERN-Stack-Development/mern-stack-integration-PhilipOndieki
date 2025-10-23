const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
} = require('../controllers/categoryController');
const { validateCategory } = require('../middleware/validateRequest');

router.route('/')
  .get(getCategories)
  .post(validateCategory, createCategory);

module.exports = router;