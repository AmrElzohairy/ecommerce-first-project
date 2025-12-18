const Brand = require('../models/brandSchema');
const factory = require('./handlerFactory');
const asyncHandler = require('express-async-handler');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');


// Upload single image
exports.uploadBrandImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`uploads/brands/${filename}`);

    // Save image into our db 
    req.body.image = filename;

    next();
});


exports.getBrands = factory.getAll(Brand, ['name']);

exports.getBrandById = factory.getOne(Brand);

exports.createBrand = factory.createOne(Brand);

exports.updateBrand = factory.updateOne(Brand);

exports.deleteBrand = factory.deleteOne(Brand);