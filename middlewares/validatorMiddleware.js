const { validationResult } = require('express-validator');

const validatorMiddleware = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return res.status(400).json(`${result.errors[0].param}: ${result.errors[0].msg}`);
    }
    next();
};


module.exports = validatorMiddleware;