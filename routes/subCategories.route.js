const express = require('express');
const router = express.Router();
const { getSubCategories, getSubCategoyById, createSubCategory } = require('../controllers/subCategory.controller');
const { createSubCategoryValidator,getSubCategoryByIdValidator } = require('../utils/validations/subCategoryValidations');

router.route('/')
    .post(createSubCategoryValidator, createSubCategory)
    .get(getSubCategories);

router.route('/:subCategoryId')
    .get(getSubCategoryByIdValidator, getSubCategoyById);



module.exports = router;