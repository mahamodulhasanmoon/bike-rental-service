"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleMongooseError_1 = __importDefault(require("../errors/handleMongooseError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessages = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const errors = (0, handleZodError_1.default)(error);
        statusCode = errors === null || errors === void 0 ? void 0 : errors.statusCode;
        message = errors === null || errors === void 0 ? void 0 : errors.message;
        errorMessages = errors.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const errors = (0, handleMongooseError_1.default)(error);
        statusCode = errors === null || errors === void 0 ? void 0 : errors.statusCode;
        message = errors === null || errors === void 0 ? void 0 : errors.message;
        errorMessages = errors === null || errors === void 0 ? void 0 : errors.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const errors = (0, handleCastError_1.default)(error);
        statusCode = errors === null || errors === void 0 ? void 0 : errors.statusCode;
        message = errors === null || errors === void 0 ? void 0 : errors.message;
        errorMessages = errors === null || errors === void 0 ? void 0 : errors.errorMessages;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = [
            {
                path: '',
                message: error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorMessages = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    else if (error.message === 'No Data Found') {
        message = 'No Data Found';
    }
    return res.status(statusCode).json(Object.assign(Object.assign({ success: false, message }, (message === 'No Data Found' ? { data: [] } : { errorMessages })), (message === 'No Data Found'
        ? null
        : { stack: config_1.default.node_env === 'development' ? error === null || error === void 0 ? void 0 : error.stack : null })));
};
exports.globalErrorHandler = globalErrorHandler;
