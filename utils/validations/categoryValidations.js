const { check } = require('express-validator');
const validationMiddleware = require('../../middlewares/validatorMiddleware');
const { create } = require('../../models/categorySchema');

getCategoryByIdValidator = [
    check('categoryId').isMongoId().withMessage('Invalid category id'),
    validationMiddleware
];

updateCategoryValidator = [
    check('categoryId').isMongoId().withMessage('Invalid category id'),
    validationMiddleware
];

deleteCategoryValidator = [
    check('categoryId').isMongoId().withMessage('Invalid category id'),
    validationMiddleware
];

createCategoryValidator = [
    check('name').notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3 }).withMessage('Category name must be at least 3 characters long')
        .isLength({ max: 32 }).withMessage('Category name must be at most 32 characters long'),
    validationMiddleware
];


module.exports = {
    getCategoryByIdValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
    createCategoryValidator
}