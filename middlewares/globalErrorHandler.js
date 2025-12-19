const ApiError = require('../utils/apiError');

let handelJWTError = () => new ApiError(401, 'Invalid token. Please log in again!');

let globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, res);
    } else {
        if (
            err.name === 'JsonWebTokenError' ||
            err.name === 'TokenExpiredError'
        ) err = handelJWTError();
        sendErrorForProd(err, res);
    }
};

const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        status: err.status,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorForProd = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

module.exports = globalErrorHandler;