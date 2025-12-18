var jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler');


exports.signUp = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    const token = jwt.sign({ userId: user._id, userEmail: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({ data: user, token });
});