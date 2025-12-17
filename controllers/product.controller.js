const Product = require('../models/productSchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');
const qs = require('qs');


let getProducts = asyncHandler(async (req, res) => {
    //filter
    let queryObj = qs.parse(req.query);
    let excludeFields = ['page', 'limit', 'sort', 'fields', 'keyword'];
    excludeFields.forEach(v => delete queryObj[v]);
    // Apply filtration using [gte, gt, lte, lt]
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);




    //pagination
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    //build query
    let mongooseQuery = Product.find(JSON.parse(queryStr))
        .limit(limit)
        .skip(skip)
        .populate('category', { __v: 0 })


    //sorting
    if (req.query.sort) {
        let sortBy = req.query.sort.split(',').join(' ');
        mongooseQuery = mongooseQuery.sort(sortBy);
    } else {
        mongooseQuery = mongooseQuery.sort('-createdAt');
    }

    //fields
    if (req.query.fields) {
        let fields = req.query.fields.split(',').join(' ');
        mongooseQuery = mongooseQuery.select(fields);
    } else {
        mongooseQuery = mongooseQuery.select('-__v');
    }

    //search
    if (req.query.keyword) {
        let query = {};
        query.$or = [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
        ];
        mongooseQuery = mongooseQuery.find(query);

    }


    let products = await mongooseQuery;

    res.status(200).json({
        status: 'success',
        results: products.length,
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