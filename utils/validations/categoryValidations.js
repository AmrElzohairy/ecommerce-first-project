const { check } = require('express-validator');
const validationMiddleware = require('../../middlewares/validatorMiddleware');

const getCategoryByIdValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validationMiddleware
];

const updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validationMiddleware
];

const deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validationMiddleware
];

const createCategoryValidator = [
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