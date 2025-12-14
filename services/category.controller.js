const categoryModel = require('../models/categorySchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')


let getAllCategories = async (req, res) => {

};

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