const SubCategory = require('../models/subCategorySchema');
const Category = require('../models/categorySchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');


let getSubCategories = asyncHandler(
    async (req, res) => {
        const countDocuments = await SubCategory.countDocuments();
        let apiFeatures = new ApiFeatures(SubCategory.find({}), req.query)
            .search(['name'])
            .filter()
            .sort()
            .limitFields()
            .paginate(countDocuments)
        let { mongooseQuery, paginationResult } = apiFeatures;
        let subCategories = await mongooseQuery;
        res.status(200).json({
            status: 'success',
            results: subCategories.length,
            paginationResult,
            data: {
                "subCategories": subCategories
            },
        });
    }
);

let getCategorySubCategories = asyncHandler(
    async (req, res, next) => {
        let categoryId = req.params.categoryId;
        let category = await Category.findById(categoryId);
        if (!category) {
            return next(new ApiError(404, 'Category not found'));
        }
        let subCategories = await SubCategory.find({ category: categoryId }).populate(
            {
                path: 'category',
                select: 'name'
            }
        )
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

let updateSubCategory = asyncHandler(
    async (req, res, next) => {
        let { subCategoryId } = req.params;
        let { name, category } = req.body;
        let subCategory = await SubCategory.findByIdAndUpdate({ _id: subCategoryId }, {
            name,
            slug: slugify(name),
            category
        }, { new: true });
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

let deleteSubCategory = asyncHandler(
    async (req, res, next) => {
        let { subCategoryId } = req.params;
        let subCategory = await SubCategory.findByIdAndDelete({ _id: subCategoryId });
        if (!subCategory) {
            return next(new ApiError(404, 'SubCategory not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'SubCategory deleted successfully'
        });
    }
);

module.exports = {
    getSubCategories,
    getSubCategoyById,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getCategorySubCategories
}