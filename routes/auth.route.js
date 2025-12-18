const express = require('express');
const router = express.Router();
const {
    signUp
} = require('../controllers/auth.controller');
const { signUpValidator } = require('../utils/validations/authValidations');


router.route('/signup')
    .post(signUpValidator, signUp);


module.exports = router;