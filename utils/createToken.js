const jwt = require('jsonwebtoken');
const createToken = (user) => jwt.sign({ userId: user._id, userEmail: user.email },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

module.exports = createToken;