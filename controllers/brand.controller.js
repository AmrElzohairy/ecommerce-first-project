const Brand = require('../models/brandSchema');
const factory = require('./handlerFactory');


exports.getBrands = factory.getAll(Brand, ['name']);

exports.getBrandById = factory.getOne(Brand);

exports.createBrand = factory.createOne(Brand);

exports.updateBrand = factory.updateOne(Brand);

exports.deleteBrand = factory.deleteOne(Brand);