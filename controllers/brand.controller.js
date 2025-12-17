const Brand = require('../models/brandSchema');
const asyncHandler = require('express-async-handler')
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');


exports.getBrands = asyncHandler(
    async (req, res) => {
        const countDocuments = await Brand.countDocuments();
        let apiFeatures = new ApiFeatures(Brand.find({}), req.query)
            .search(['name'])
            .filter()
            .sort()
            .limitFields()
            .paginate(countDocuments)
        let { mongooseQuery, paginationResult } = apiFeatures;
        let brands = await mongooseQuery;

        res.status(200).json({
            status: 'success',
            results: brands.length,
            paginationResult,
            data: {
                "Brands": brands
            },
        });
    }
)

exports.getBrandById = factory.getOne(Brand);

exports.createBrand = factory.createOne(Brand);

exports.updateBrand = factory.updateOne(Brand);

exports.deleteBrand = factory.deleteOne(Brand);