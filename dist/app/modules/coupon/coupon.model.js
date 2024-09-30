"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = require("mongoose");
const couponSchema = new mongoose_1.Schema({
    coupon: {
        type: String,
        require: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        require: true,
    },
});
exports.Coupon = (0, mongoose_1.model)('Coupon', couponSchema);
