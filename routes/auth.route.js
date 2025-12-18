const express = require('express');
const router = express.Router();
const {
    signUp,
    login
} = require('../controllers/auth.controller');
const { signUpValidator, loginValidator } = require('../utils/validations/authValidations');


router.route('/signup')
    .post(signUpValidator, signUp);

router.route('/login')
    .post(loginValidator, login);


module.exports = router;