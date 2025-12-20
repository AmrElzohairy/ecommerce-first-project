const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { getCategoryByIdValidator, updateCategoryValidator, deleteCategoryValidator, createCategoryValidator } = require('../utils/validations/categoryValidations');
const auth = require('../controllers/auth.controller');
const roles = require('../utils/userRoles');


router.route('/')
    .get(getAllCategories)
    .post(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        createCategoryValidator, createCategory);

router.route('/:id')
    .get(getCategoryByIdValidator, getCategoryById)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;