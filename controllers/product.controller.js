const Product = require('../models/productSchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');


let getProducts = asyncHandler(async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    let allProductsLength = await Product.countDocuments();
    let products = await Product.find({}).limit(limit).skip(skip);
    res.status(200).json({
        status: 'success',
        results: allProductsLength,
        data: {
            "products": products
        },
    });
});

let getProduct = asyncHandler(async (req, res, next) => {
    let productId = req.params.productId;
    let product = await Product.findById(productId, { __v: 0 });
    if (!product) {
        return next(new ApiError(404, 'Product not found'));
    }
    res.status(200).json({
        status: 'success',
        data: {
            "product": product
        },
    });
});

let createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    let product = await Product.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            "product": product
        },
    });
})

let updateProduct = asyncHandler(
    async (req, res, next) => {
        let productId = req.params.productId;
        req.body.slug = slugify(req.body.title);
        let product = await Product.findByIdAndUpdate({ _id: productId }, req.body, { new: true });
        if (!product) {
            return next(new ApiError(404, 'Product not found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
                "product": product
            },
        });
    }
);

let deleteProduct = asyncHandler(
    async (req, res, next) => {
        let productId = req.params.productId;
        let product = await Product.findByIdAndDelete({ _id: productId });
        if (!product) {
            return next(new ApiError(404, 'Product not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully'
        });
    }
);

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};