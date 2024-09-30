"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// handle controller error and resolve if no error. also send this error global error
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error));
    };
};
exports.default = catchAsync;
