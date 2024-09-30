"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// make app error to handle error with status code and modify the Error default
class AppError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
