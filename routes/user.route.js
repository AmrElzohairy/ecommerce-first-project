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
        createBrandValidator, createUser)

router.route('/:id')
    .get(getBrandByIdValidator, getUserById)
    .put(updateBrandValidator, updateUser)
    .delete(deleteBrandValidator, deleteUser)


module.exports = router;