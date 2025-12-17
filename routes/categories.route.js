const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { getCategoryByIdValidator, updateCategoryValidator, deleteCategoryValidator, createCategoryValidator } = require('../utils/validations/categoryValidations');

router.route('/')
    .get(getAllCategories)
    .post(createCategoryValidator, createCategory);

router.route('/:Id')
    .get(getCategoryByIdValidator, getCategoryById)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;