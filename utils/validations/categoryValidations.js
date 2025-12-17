const { check } = require('express-validator');
const validationMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');

const getCategoryByIdValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validationMiddleware
];

const updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    check('name').custom((val, { req }) => {
        if (val) {
            req.body.slug = slugify(val);
            return true
        }
    }),
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
        .isLength({ max: 32 }).withMessage('Category name must be at most 32 characters long')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true
        }),
    validationMiddleware
];


module.exports = {
    getCategoryByIdValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
    createCategoryValidator
}