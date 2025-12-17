const express = require('express');
const router = express.Router();
const { getBrands, getBrandById, createBrand, deleteBrand, updateBrand } = require('../controllers/brand.controller');
const { getBrandByIdValidator,
    updateBrandValidator,
    deleteBrandValidator,
    createBrandValidator } = require("../utils/validations/brandValidations");
router.route('/')
    .get(getBrands)
    .post(createBrandValidator, createBrand)


router.route('/:Id')
    .get(getBrandByIdValidator, getBrandById)
    .put(updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, deleteBrand)


module.exports = router;