const express = require('express');
const router = express.Router();
const {
    signUp,
    login,
    forgotPassword
} = require('../controllers/auth.controller');
const { signUpValidator, loginValidator } = require('../utils/validations/authValidations');


router.route('/signup')
    .post(signUpValidator, signUp);

router.route('/login')
    .post(loginValidator, login);


router.route('/forgotPassword')
    .post(forgotPassword);


module.exports = router;