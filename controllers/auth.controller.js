const User = require('../models/userSchema');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');



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