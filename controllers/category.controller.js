const categoryModel = require('../models/categorySchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');



let getAllCategories = asyncHandler(async (req, res) => {
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

let getCategoryById = asyncHandler(async (req, res, next) => {
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

let createCategory = asyncHandler(async (req, res) => {
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

let updateCategory = asyncHandler(
  async (req, res , next) => {
    let categoryId = req.params.categoryId;
    let name = req.body.name;
    let category = await categoryModel.findByIdAndUpdate({ _id: categoryId }, {
      name,
      slug: slugify(name)
    }, { new: true });
    if (!category) {
     return next(new ApiError(404, 'Category not found'));
    }
    res.status(200).json({
      status: 'success',
      data: {
        "category": category
      },
    });
  }
);

let deleteCategory = asyncHandler(
  async (req, res , next) => {
    let categoryId = req.params.categoryId;
    let category = await categoryModel.findByIdAndDelete({ _id: categoryId });
    if (!category) {
     return next(new ApiError(404, 'Category not found'));
    }
    res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully'
    });
  }
);

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};