const { check } = require('express-validator');
const validationMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userSchema');
const bcrypt = require('bcrypt');

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
    check('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    validationMiddleware
]

const changePasswordValidator = [
    check('id')
        .isMongoId().withMessage('Invalid id Format'),
    check('currentPassword')
        .notEmpty()
        .withMessage('Current password is required')
        .custom(async (value, { req }) => {
            const user = await User.findById(req.params.id);
            if (!user) {
                return Promise.reject('User not found');
            }
            const isPasswordCorrect = await bcrypt.compare(value, user.password);
            if (!isPasswordCorrect) {
                return Promise.reject('Current password is incorrect');
            }
            return true;
        }),
    check('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long'),
    check('passwordConfirmation')
        .notEmpty()
        .withMessage('Password confirmation is required')
        .custom((passwordConfirmation, { req }) => {
            if (passwordConfirmation !== req.body.newPassword) {
                return Promise.reject('Password confirmation does not match new password');
            }
            return true;
        }),
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
        .withMessage('Invalid email format')
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject('E-mail already exists');
            }
        }),
    check('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone(['ar-EG', 'ar,SA'])
        .withMessage('Invalid phone number format for Egypt or Saudi Arabia')
        .custom(async (value) => {
            const user = await User.findOne({ phone: value });
            if (user) {
                return Promise.reject('Phone number already exists');
            }
        })
    ,
    check('passwordConfirmation')
        .notEmpty()
        .withMessage('Password confirmation is required'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .custom((password, { req }) => {
            if (password !== req.body.passwordConfirmation) {
                return Promise.reject('Password confirmation does not match');
            }
            return true;
        }),
    check('profileImg')
        .optional(),
    validationMiddleware
]


module.exports = {
    getUserValidator,
    deleteUserValidator,
    updateUserValidator,
    createUserValidator,
    changePasswordValidator
}

