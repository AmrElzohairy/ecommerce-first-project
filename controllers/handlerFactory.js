const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');


exports.deleteOne = (Model) => asyncHandler(
    async (req, res, next) => {
        let { id } = req.params;
        let document = await Model.findByIdAndDelete(id);
        if (!document) {
            return next(new ApiError(404, 'Document not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Deleted successfully'
        });
    }
);

exports.updateOne = (Model) => asyncHandler(
    async (req, res, next) => {
        let { id } = req.params;
        let document = await Model.findByIdAndUpdate(id, req.body, { new: true });
        if (!document) {
            return next(new ApiError(404, 'Document not found'));
        }
        res.status(200).json({
            status: 'success',
            data: document
        });
    }
);

exports.createOne = (Model) => asyncHandler(
    async (req, res) => {
        let document = await Model.create(req.body);
        res.status(201).json({
            status: 'success',
            data: document
        });
    }
);