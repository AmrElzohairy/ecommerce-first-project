const categoryModel = require('../models/categorySchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');
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

exports.getCategoryById = asyncHandler(async (req, res, next) => {
  let categoryId = req.params.categoryId;
  let category = await categoryModel.findById(categoryId, { __v: 0 });
  if (!category) {
    return next(new ApiError(404, 'Category not found'));
  }
  res.status(200).json({
    status: 'success',
    data: {
      "category": category
    },
  });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  let category = await categoryModel.create({
    name,
    slug: slugify(name)
  });
  res.status(201).json({
    status: 'success',
    data: {
      "category": category
    },
  });
})

exports.updateCategory = factory.updateOne(categoryModel);


exports.deleteCategory = factory.deleteOne(categoryModel);

