"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    const statusCode = 400;
    const extractedMessage = error.message.match(/name:\s*"([^"]+)"/);
    const errorMessages = [
        {
            path: '',
            message: extractedMessage && `${extractedMessage[1]} is Already Exists`,
        },
    ];
    return {
        statusCode,
        message: 'Already Exists',
        errorMessages,
    };
};
exports.default = handleDuplicateError;
