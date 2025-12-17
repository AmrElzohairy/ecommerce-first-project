const { check } = require('express-validator');
const validationMiddleware = require('../../middlewares/validatorMiddleware');

const getBrandByIdValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id'),
    validationMiddleware
];

const updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id'),
    validationMiddleware
];

const deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id'),
    validationMiddleware
];

const createBrandValidator = [
    check('name').notEmpty()
        .withMessage('Brand name is required')
        .isLength({ min: 3 }).withMessage('Brand name must be at least 3 characters long')
        .isLength({ max: 32 }).withMessage('Brand name must be at most 32 characters long'),
    validationMiddleware
];


module.exports = {
    getBrandByIdValidator,
    updateBrandValidator,
    deleteBrandValidator,
    createBrandValidator
}