const User = require('../models/userSchema');
const factory = require('./handlerFactory');
const asyncHandler = require('express-async-handler');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcrypt');


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
            .toFile(`uploads/users/${filename}`);

        // Save image into our db 
        req.body.profileImg = filename;
    }

    next();
});


exports.getUsers = factory.getAll(User, ['firstName', 'lastName', 'email', 'phone']);

exports.getUserById = factory.getOne(User);

exports.createUser = factory.createOne(User);

exports.updateUser = asyncHandler(
    async (req, res, next) => {
        let { id } = req.params;
        let user = await User.findByIdAndUpdate(id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                profileImg: req.body.profileImg
            },
            { new: true });
        if (!user) {
            return next(new ApiError(404, 'User not found'));
        }
        res.status(200).json({
            status: 'success',
            data: user
        });
    }
);

exports.changePassword = asyncHandler(
    async (req, res, next) => {
        let { id } = req.params;
        let user = await User.findByIdAndUpdate(id,
            {
                password: bcrypt.hashSync(req.body.newPassword, 12),
                passwordChangedAt: Date.now()
            },
        );
        if (!user) {
            return next(new ApiError(404, 'User not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Password Changed Successfully'
        });
    }
);

exports.deleteUser = factory.deleteOne(User);