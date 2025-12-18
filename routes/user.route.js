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
const { getBrandByIdValidator,
    updateBrandValidator,
    deleteBrandValidator,
    createBrandValidator } = require("../utils/validations/brandValidations");
router.route('/')
    .get(getUsers)
    .post(
        uploadUserImage,
        resizeImage,
        createUser)

router.route('/:id')
    .get(getUserById)
    .put(
        uploadUserImage,
        resizeImage,
        updateUser)
    .delete(deleteUser)


module.exports = router;