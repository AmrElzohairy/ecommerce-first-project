const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const roles = require('../utils/userRoles');
const {
    getBrands,
    getBrandById,
    createBrand,
    deleteBrand,
    updateBrand,
    uploadBrandImage,
    resizeImage
} = require('../controllers/brand.controller');
const { getBrandByIdValidator,
    updateBrandValidator,
    deleteBrandValidator,
    createBrandValidator } = require("../utils/validations/brandValidations");
router.route('/')
    .get(
        auth.protect,
        getBrands)
    .post(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        uploadBrandImage,
        resizeImage,
        createBrandValidator, createBrand)


router.route('/:id')
    .get(
        auth.protect,
        getBrandByIdValidator, getBrandById)
    .put(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        updateBrandValidator, updateBrand)
    .delete(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        deleteBrandValidator, deleteBrand)


module.exports = router;