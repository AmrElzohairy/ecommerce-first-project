const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler');

exports.protectRoutes = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ApiError(401, 'You are not logged in! Please log in to get access.'));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
        return next(new ApiError(401, 'This user does not exist anymore.'));
    }

    if (currentUser.passwordChangedAt) {
        const changedTimestamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10);
        if (decoded.iat < changedTimestamp) {
            return next(new ApiError(401, 'User recently changed password! Please log in again.'));
        }
    }
    req.user = currentUser;
    next();

});