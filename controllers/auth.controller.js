const crypto = require('crypto');
const User = require('../models/userSchema');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');
const { protectRoutes } = require('../middlewares/protectRoutesMiddleware');
const sendEmail = require('../utils/sendEmail');



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
    res.status(200).json({ data: user, token });
});

exports.protect = protectRoutes;

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