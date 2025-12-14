const categoryModel = require('../models/categorySchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')


let getAllCategories = asyncHandler(async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  let allCategoriesLength = await categoryModel.countDocuments();
  let categories = await categoryModel.find({}).limit(limit).skip(skip);
  res.status(200).json({
    status: 'success',
    results: allCategoriesLength,
    data: {
      "categories": categories
    },
  });
});

let getCategoryById = asyncHandler(async (req, res) => {
  let categoryId = req.params.categoryId;
  let category = await categoryModel.findById(categoryId , {__v: 0});
  res.status(200).json({
    status: 'success',
    data: {
      "category": category
    },
  });
});

let createCategory = asyncHandler(async (req, res) => {
  const name  = req.body.name;
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

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById
};