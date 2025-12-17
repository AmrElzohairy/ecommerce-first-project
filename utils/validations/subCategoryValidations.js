const { check } = require('express-validator');
const validationMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');

const getSubCategoryByIdValidator = [
    check('id')
        .isMongoId().withMessage('Invalid subCategory id'),
    validationMiddleware
];

const updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid subCategory id'),
    check('id')
        .optional()
        .isMongoId().withMessage('Invalid  id'),
    check('name').notEmpty()
        .withMessage('SubCategory name is required')
        .isLength({ min: 3 }).withMessage('SubCategory name must be at least 3 characters long')
        .isLength({ max: 32 }).withMessage('SubCategory name must be at most 32 characters long')
        .custom((val, { req }) => {
            if (val) {
                req.body.slug = slugify(val);
                return true
            }
        }),
    validationMiddleware
];

const deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid subCategory id'),
    validationMiddleware
];

const getCategorySubCategoriesValidator = [
    check('categoidryId').isMongoId().withMessage('Invalid category id'),
    validationMiddleware
];

const createSubCategoryValidator = [
    check('name').notEmpty()
        .withMessage('SubCategory name is required')
        .isLength({ min: 3 }).withMessage('SubCategory name must be at least 3 characters long')
        .isLength({ max: 32 }).withMessage('SubCategory name must be at most 32 characters long')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true
        }),
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