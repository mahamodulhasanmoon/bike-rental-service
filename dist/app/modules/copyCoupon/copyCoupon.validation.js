"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyCouponValidation = void 0;
const zod_1 = require("zod");
const copyCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        coupon: zod_1.z.string({ required_error: "Coupon is required" }),
    })
});
exports.CopyCouponValidation = {
    copyCouponValidationSchema,
};
