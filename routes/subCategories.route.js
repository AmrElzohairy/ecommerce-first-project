const express = require('express');
const router = express.Router();
const { createSubCategory} = require('../controllers/subCategory.controller');
const { createSubCategoryValidator } = require('../utils/validations/subCategoryValidations');

router.route('/')
    .post(createSubCategoryValidator, createSubCategory);



module.exports = router;