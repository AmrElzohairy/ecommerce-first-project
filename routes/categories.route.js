const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { getCategoryByIdValidator } = require('../utils/validations/categoryValidations');

router.route('/').get(getAllCategories).post(createCategory);

router.route('/:categoryId').get(getCategoryByIdValidator, getCategoryById).put(updateCategory).delete(deleteCategory);

module.exports = router;