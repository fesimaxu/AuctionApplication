"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessages = exports.notFoundError = void 0;
const notFoundError = (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
};
exports.notFoundError = notFoundError;
const errorMessages = (err, req, res, next) => {
    err.status = err.status || `error`;
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};
exports.errorMessages = errorMessages;
