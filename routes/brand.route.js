const express = require('express');
const router = express.Router();
const { getAllBrands, getBrandById, createBrand, deleteBrand, updateBrand } = require('../controllers/brand.controller');

router.route('/')
    .get(getAllBrands)
    .post(createBrand)


router.route('/:brandId')
    .get(getBrandById)
    .put(updateBrand)
    .delete(deleteBrand)


module.exports = router;