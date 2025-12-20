const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const roles = require('../utils/userRoles');

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct } = require('../controllers/product.controller');
const {
    createProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../utils/validations/productValidation');

router.route('/')
    .get(auth.protect, getProducts)
    .post(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        createProductValidator, createProduct);

router.route('/:id')
    .get(auth.protect, getProductValidator, getProduct)
    .put(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        updateProductValidator, updateProduct)
    .delete(
        auth.protect,
        auth.allowedTo(roles.ADMIN, roles.Manager),
        deleteProductValidator, deleteProduct);

module.exports = router;