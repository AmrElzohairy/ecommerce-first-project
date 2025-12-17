const categoryModel = require('../models/categorySchema');
const asyncHandler = require('express-async-handler')
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');



exports.getAllCategories = asyncHandler(async (req, res) => {
  const countDocuments = await categoryModel.countDocuments();
  let apiFeatures = new ApiFeatures(categoryModel.find({}), req.query)
    .search(['name'])
    .filter()
    .sort()
    .limitFields()
    .paginate(countDocuments)
  let { mongooseQuery, paginationResult } = apiFeatures;
  let categories = await mongooseQuery;
  res.status(200).json({
    status: 'success',
    results: categories.length,
    paginationResult,
    data: {
      "categories": categories
    },
  });
});

exports.getCategoryById = factory.getOne(categoryModel);

exports.createCategory = factory.createOne(categoryModel);

exports.updateCategory = factory.updateOne(categoryModel);


exports.deleteCategory = factory.deleteOne(categoryModel);

