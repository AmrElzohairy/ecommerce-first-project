const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { getCategoryByIdValidator, updateCategoryValidator, deleteCategoryValidator, createCategoryValidator } = require('../utils/validations/categoryValidations');
const auth = require('../controllers/auth.controller');

router.route('/')
    .get(getAllCategories)
    .post(
        auth.protect,
        createCategoryValidator, createCategory);

router.route('/:id')
    .get(getCategoryByIdValidator, getCategoryById)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;