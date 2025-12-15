const express = require('express');
const router = express.Router();
const { getAllBrands, getBrandById, createBrand, deleteBrand, updateBrand } = require('../controllers/brand.controller');
const { getBrandByIdValidator,
    updateBrandValidator,
    deleteBrandValidator,
    createBrandValidator } = require("../utils/validations/brandValidations");
router.route('/')
    .get(getAllBrands)
    .post(createBrandValidator, createBrand)


router.route('/:brandId')
    .get(getBrandByIdValidator, getBrandById)
    .put(updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, deleteBrand)


module.exports = router;