const categoryModel = require('../models/categorySchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')


let getAllCategories = asyncHandler(async (req, res) => {
  let categories = await categoryModel.find({});
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      "categories": categories
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
};