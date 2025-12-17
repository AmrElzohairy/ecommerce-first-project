const Product = require('../models/productSchema');
const factory = require('./handlerFactory');



let getProducts = factory.getAll(Product, ['title', 'decription']);
let getProduct = factory.getOne(Product);

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