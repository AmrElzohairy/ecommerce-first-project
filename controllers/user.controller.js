const User = require('../models/userSchema');
const factory = require('./handlerFactory');
const asyncHandler = require('express-async-handler');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');


// Upload single image
exports.uploadUserImage = uploadSingleImage('profileImg');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/brands/${filename}`);

        // Save image into our db 
        req.body.image = filename;
    }

    next();
});


exports.getUsers = factory.getAll(User, ['firstName', 'lastName','email', 'phone']);

exports.getUserById = factory.getOne(User);

exports.createUser = factory.createOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);