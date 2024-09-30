"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const statusCode = 400;
    const errorMessages = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    return {
        statusCode,
        message: 'Invalid ID',
        errorMessages,
    };
};
exports.default = handleCastError;
