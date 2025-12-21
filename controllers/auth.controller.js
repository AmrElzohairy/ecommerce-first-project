const crypto = require('crypto');
const User = require('../models/userSchema');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');




exports.signUp = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    const token = createToken(user);
    res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError(401, 'Incorrect email or password'));
    }

    const token = createToken(user);
    res.status(200).json({ 
        status: 'success',
        message: req.t('auth.loginSuccess'),
        data: user, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
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

exports.allowedTo = (...roles) => asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new ApiError(403, 'You are not allowed to access this route'));
    }
    next();
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ApiError(404, `There is no user with email ${req.body.email}`));
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto.createHash('sha256').update(resetCode).digest('hex');
    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now() + 2 * 60 * 1000; // 2 minutes
    user.passwordResetVerified = false;
    await user.save();

    const message = `Hi ${user.firstName},\n\nYour password reset code is: ${resetCode}\n\nIf you did not request a password reset, please ignore this email.\n\nThanks,\nE-Store Team`;

    try {
        await sendEmail({
            to: user.email,
            subject: 'Your password reset code (valid for 2 minutes)',
            text: message,
        });
        res.status(200).json({ status: 'success', message: 'Reset code sent to email!' });
    } catch (err) {
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerified = false;
        await user.save();
        console.log(err);
        return next(new ApiError(500, 'There was an error sending the email. Try again later.'));
    }
});

exports.verifyResetCode = asyncHandler(async (req, res, next) => {
    const hashedResetCode = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
    const user = await User.findOne({
        passwordResetCode: hashedResetCode,
        passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) {
        return next(new ApiError(400, 'Reset code is invalid or has expired'));
    }
    user.passwordResetVerified = true;
    await user.save();
    res.status(200).json({ status: 'success', message: 'Reset code verified!' });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ApiError(404, 'There is no user with this email'));
    }
    if (!user.passwordResetVerified) {
        return next(new ApiError(400, 'Reset code not verified'));
    }
    user.password = req.body.newPassword;
    user.passwordChangedAt = Date.now();
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = false;
    await user.save();
    const token = createToken(user);
    res.status(200).json({
        status: 'success',
        message: 'Password reset successfully',
        token
    });
});