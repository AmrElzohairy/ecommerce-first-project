const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    uploadUserImage,
    resizeImage
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
        uploadUserImage,
        createUserValidator,
        resizeImage,
        createUser)



router.route('/:id')
    .get(getUserValidator, getUserById)
    .put(
        uploadUserImage,
        updateUserValidator,
        resizeImage,
        updateUser)
    .delete(deleteUserValidator, deleteUser)


router.route('/changePassword/:id')
    .put(
        changePasswordValidator,
        changePassword
    )


module.exports = router;