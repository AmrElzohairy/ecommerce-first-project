let globalErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode,
        status: err.status,
        message: err.message,
    });
};

module.exports = globalErrorHandler;