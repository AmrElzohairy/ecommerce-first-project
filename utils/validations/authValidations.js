const { check } = require('express-validator');
const validationMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userSchema');

exports.signUpValidator = [
    check('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('First name must be between 2 and 100 characters'),
    check('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Last name must be between 2 and 100 characters'),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    check('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone(['ar-EG', 'ar,SA'])
        .withMessage('Invalid phone number format'),
    validationMiddleware
];