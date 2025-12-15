const express = require('express');
const router = express.Router();
const { getSubCategories, getSubCategoyById, createSubCategory, updateSubCategory, deleteSubCategory } = require('../controllers/subCategory.controller');
const { createSubCategoryValidator,getSubCategoryByIdValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validations/subCategoryValidations');

router.route('/')
    .post(createSubCategoryValidator, createSubCategory)
    .get(getSubCategories);

router.route('/:subCategoryId')
    .get(getSubCategoryByIdValidator, getSubCategoyById)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);



module.exports = router;