const SubCategory = require('../models/subCategorySchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');



let createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    let subCategory = await SubCategory.create({
        name,
        slug: slugify(name),
        category
    });
    res.status(201).json({
        status: 'success',
        data: {
            "category": subCategory
        },
    });
})

module.exports = {
    createSubCategory
}