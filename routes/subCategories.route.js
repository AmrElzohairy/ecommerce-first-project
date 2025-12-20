const express = require('express');
const router = express.Router();
const { getCategorySubCategories, getSubCategories, getSubCategoyById, createSubCategory, updateSubCategory, deleteSubCategory } = require('../controllers/subCategory.controller');
const { getCategorySubCategoriesValidator, createSubCategoryValidator, getSubCategoryByIdValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validations/subCategoryValidations');
const auth = require('../controllers/auth.controller');
const roles = require('../utils/userRoles');


router.route('/')
    .post(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        createSubCategoryValidator, createSubCategory)
    .get(auth.protect, getSubCategories);

router.route('/:id')
    .get(auth.protect, getSubCategoryByIdValidator, getSubCategoyById)
    .put(auth.protect, auth.allowedTo(roles.ADMIN, roles.Manager), updateSubCategoryValidator, updateSubCategory)
    .delete(auth.protect, auth.allowedTo(roles.ADMIN, roles.Manager), deleteSubCategoryValidator, deleteSubCategory);

router.route('/category/:id')
    .get(auth.protect, getCategorySubCategoriesValidator, getCategorySubCategories);



module.exports = router;