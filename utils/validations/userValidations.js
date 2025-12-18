const { check } = require('express-validator');
const validationMiddleware = require('../../middlewares/validatorMiddleware');

const getUserValidator = [
    check('id').isMongoId().withMessage('Invalid id Format'),
    validationMiddleware,
    
]

const deleteUserValidator = [
    check('id')
        .isMongoId().withMessage('Invalid id Format'),
    validationMiddleware
]

const updateUserValidator = [
    check('id')
        .isMongoId().withMessage('Invalid id Format'),
    validationMiddleware
]

const createUserValidator = [
    check('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters long')
        .isLength({ max: 32 })
        .withMessage('First name must be at most 32 characters long'),
    check('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 2 })
        .withMessage('Last name must be at least 2 characters long')
        .isLength({ max: 32 })
        .withMessage('Last name must be at most 32 characters long'),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    check('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone()
        .withMessage('Invalid phone number'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    validationMiddleware
]


module.exports = {
    getUserValidator,
    deleteUserValidator,
    updateUserValidator,
    createUserValidator
}

