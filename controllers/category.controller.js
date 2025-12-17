const categoryModel = require('../models/categorySchema');
const factory = require('./handlerFactory');


exports.getAllCategories = factory.getAll(categoryModel, ['name']);

exports.getCategoryById = factory.getOne(categoryModel);

exports.createCategory = factory.createOne(categoryModel);

exports.updateCategory = factory.updateOne(categoryModel);


exports.deleteCategory = factory.deleteOne(categoryModel);

