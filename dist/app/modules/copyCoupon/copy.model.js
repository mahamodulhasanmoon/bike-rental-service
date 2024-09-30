"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyCoupon = void 0;
const mongoose_1 = require("mongoose");
const copyCouponModel = new mongoose_1.Schema({
    coupon: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});
exports.CopyCoupon = (0, mongoose_1.model)('CopyCoupon', copyCouponModel);
