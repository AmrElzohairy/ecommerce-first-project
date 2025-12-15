const SubCategory = require('../models/subCategorySchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');


let getSubCategories = asyncHandler(
    async (req, res) => {
        let subCategories = await SubCategory.find({});
        res.status(200).json({
            status: 'success',
            data: {
                "subCategories": subCategories
            },
        });
    }
);


let getSubCategoyById = asyncHandler(
    async (req, res, next) => {
        let { subCategoryId } = req.params;
        let subCategory = await SubCategory.findById(subCategoryId);
        if (!subCategory) {
            return next(new ApiError(404, 'SubCategory not found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
                "subCategory": subCategory
            },
        });

    }
);


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
    getSubCategories,
    getSubCategoyById,
    createSubCategory
}