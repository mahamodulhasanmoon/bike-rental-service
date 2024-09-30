"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseError = (error) => {
    const statusCode = 400;
    const errorMessages = Object.values(error.errors).map((err) => {
        return {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: err === null || err === void 0 ? void 0 : err.message,
        };
    });
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages,
    };
};
exports.default = handleMongooseError;
