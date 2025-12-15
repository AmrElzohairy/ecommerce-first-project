const Brand = require('../models/brandSchema');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');


exports.getAllBrands = asyncHandler(
    async (req, res) => {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        let allBrandsLength = await Brand.countDocuments();
        let brands = await Brand.find({}).limit(limit).skip(skip);
        res.status(200).json({
            status: 'success',
            results: allBrandsLength,
            data: {
                "brands": brands
            },
        });
    }
)

exports.getBrandById = asyncHandler(
    async (req, res, next) => {
        let brandId = req.params.brandId;
        let brand = await Brand.findById(brandId, { __v: 0 });
        if (!brand) {
            return next(new ApiError(404, 'Brand not found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
                "brand": brand
            },
        });
    }
)

exports.createBrand = asyncHandler(
    async (req, res) => {
        const { name } = req.body;
        let brand = await Brand.create({
            name,
            slug: slugify(name)
        });
        res.status(201).json({
            status: 'success',
            data: {
                "brand": brand
            },
        });
    }
)

exports.updateBrand = asyncHandler(
    async (req, res , next) => {
        let brandId = req.params.brandId;
        let name = req.body.name;
        let brand = await Brand.findByIdAndUpdate({ _id: brandId }, {
            name,
            slug: slugify(name)
        }, { new: true });
        if (!brand) {
         return next(new ApiError(404, 'Brand not found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
                "brand": brand
            },
        });
    }
)

exports.deleteBrand = asyncHandler(
    async (req, res , next) => {
        let brandId = req.params.brandId;
        let brand = await Brand.findByIdAndDelete({ _id: brandId });
        if (!brand) {
         return next(new ApiError(404, 'Brand not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Brand deleted successfully'
        });
    }
)