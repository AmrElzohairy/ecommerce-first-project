const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');


exports.deleteOne = (Model) => asyncHandler(
    async (req, res, next) => {
        let { id } = req.params;
        let document = await Model.findByIdAndDelete({ _id: id });
        if (!document) {
            return next(new ApiError(404, 'Document not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Deleted successfully'
        });
    }
);