const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const roles = require('../utils/userRoles');
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    uploadUserImage,
    resizeImage,
    getMe,
    changePasswordMe
} = require('../controllers/user.controller');
const {
    getUserValidator,
    deleteUserValidator,
    updateUserValidator,
    createUserValidator,
    changePasswordValidator
} = require("../utils/validations/userValidations");
router.route('/')
    .get(getUsers)
    .post(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        uploadUserImage,
        createUserValidator,
        resizeImage,
        createUser)



router.route('/me')
    .get(
        auth.protect,
        getMe,
        getUserById
    )
    .put(
        auth.protect,
        uploadUserImage,
        resizeImage,
        changePasswordMe
    );



router.route('/:id')
    .get(getUserValidator, getUserById)
    .put(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        uploadUserImage,
        updateUserValidator,
        resizeImage,
        updateUser)
    .delete(deleteUserValidator, deleteUser)

router.route('/changePassword/:id')
    .put(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        changePasswordValidator,
        changePassword
    )




module.exports = router;