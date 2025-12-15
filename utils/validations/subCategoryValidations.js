const { check } = require('express-validator');
const validationMiddleware = require('../../middlewares/validatorMiddleware');

const getSubCategoryByIdValidator = [
    check('subCategoryId')
        .isMongoId().withMessage('Invalid subCategory id'),
    validationMiddleware
];

const updateSubCategoryValidator = [
    check('subCategoryId').isMongoId().withMessage('Invalid subCategory id'),
    check('subCategoryId')
    .optional()
    .isMongoId().withMessage('Invalid  id'),
    check('name').notEmpty()
        .withMessage('SubCategory name is required')
        .isLength({ min: 3 }).withMessage('SubCategory name must be at least 3 characters long')
        .isLength({ max: 32 }).withMessage('SubCategory name must be at most 32 characters long'),
    validationMiddleware
];

const deleteSubCategoryValidator = [
    check('subCategoryId').isMongoId().withMessage('Invalid subCategory id'),
    validationMiddleware
];

const getCategorySubCategoriesValidator = [
    check('categoryId').isMongoId().withMessage('Invalid category id'),
    validationMiddleware
];

const createSubCategoryValidator = [
    check('name').notEmpty()
        .withMessage('SubCategory name is required')
        .isLength({ min: 3 }).withMessage('SubCategory name must be at least 3 characters long')
        .isLength({ max: 32 }).withMessage('SubCategory name must be at most 32 characters long'),
    check('category')
        .notEmpty().withMessage('Category is required')
        .isMongoId().withMessage('Invalid Category id Format'),
    validationMiddleware
];


module.exports = {
    getSubCategoryByIdValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
    createSubCategoryValidator,
    getCategorySubCategoriesValidator
}