const Product = require('../models/productSchema');
const asyncHandler = require('express-async-handler')
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');



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

let getProduct =   factory.getOne(Product);

let createProduct = factory.createOne(Product);

let updateProduct = factory.updateOne(Product);

let deleteProduct = factory.deleteOne(Product);

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};