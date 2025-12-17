const express = require('express');
const router = express.Router();
const {getCategorySubCategories, getSubCategories, getSubCategoyById, createSubCategory, updateSubCategory, deleteSubCategory } = require('../controllers/subCategory.controller');
const {getCategorySubCategoriesValidator, createSubCategoryValidator,getSubCategoryByIdValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validations/subCategoryValidations');

router.route('/')
    .post(createSubCategoryValidator, createSubCategory)
    .get(getSubCategories);

router.route('/:id')
    .get(getSubCategoryByIdValidator, getSubCategoyById)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);

router.route('/category/:id')
    .get(getCategorySubCategoriesValidator,getCategorySubCategories);



module.exports = router;