const { check } = require('express-validator');
const validationMiddleware = require('../../middlewares/validatorMiddleware');

getCategoryByIdValidator = [
    check('categoryId').isMongoId().withMessage('Invalid category id'),
    validationMiddleware
];


module.exports = {
    getCategoryByIdValidator
}