"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const noDataFound = (res, data) => {
    if (!data || data.length === 0) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            message: 'No Data Found',
            data: [],
        });
    }
    else {
        return false;
    }
};
exports.default = noDataFound;
