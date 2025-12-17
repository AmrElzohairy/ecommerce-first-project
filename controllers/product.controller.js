const Product = require('../models/productSchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');


let getProducts = asyncHandler(async (req, res) => {
    const countDocuments = await Product.countDocuments();
    let apiFeatures = new ApiFeatures(Product.find({}), req.query)
        .search(['title', 'description'])
        .filter()
        .sort()
        .limitFields()
        .paginate(countDocuments)
     let {mongooseQuery, paginationResult} = apiFeatures;
    let products = await mongooseQuery;

    res.status(200).json({
        status: 'success',
        results: products.length,
        paginationResult,
        data: {
            "products": products
        },
    });
});

let getProduct = asyncHandler(async (req, res, next) => {
    let productId = req.params.productId;
    let product = await Product.findById(productId, { __v: 0 })
        .populate('category');;
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
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
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