const SubCategory = require('../models/subCategorySchema');
const Category = require('../models/categorySchema');
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');
const factory = require('./handlerFactory');



let getSubCategories = factory.getAll(SubCategory, SubCategory.countDocuments, ['name']);

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



let getSubCategoyById = factory.getOne(SubCategory);

let createSubCategory = factory.createOne(SubCategory);

let updateSubCategory = factory.updateOne(SubCategory);

let deleteSubCategory = factory.deleteOne(SubCategory);

module.exports = {
    getSubCategories,
    getSubCategoyById,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getCategorySubCategories
}