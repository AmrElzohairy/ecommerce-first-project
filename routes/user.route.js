const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    uploadUserImage,
    resizeImage
} = require('../controllers/user.controller');
const {
    getUserValidator,
    deleteUserValidator,
    updateUserValidator,
    createUserValidator
} = require("../utils/validations/userValidations");
router.route('/')
    .get(getUsers)
    .post(
        uploadUserImage,
        resizeImage,
        createUserValidator,

        createUser)

router.route('/:id')
    .get(getUserValidator, getUserById)
    .put(
        uploadUserImage,
        resizeImage,
        updateUserValidator,
        updateUser)
    .delete(deleteUserValidator, deleteUser)


module.exports = router;