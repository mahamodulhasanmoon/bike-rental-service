"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponValidations = void 0;
const zod_1 = require("zod");
const createCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        coupon: zod_1.z.string({ required_error: 'Coupon is Required' }),
        discount: zod_1.z.number({ required_error: 'Discount is Required' }),
        title: zod_1.z.string({ required_error: 'Title is Required' }),
    }),
});
const updateCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        coupon: zod_1.z.string({ required_error: 'Coupon is Required' }).optional(),
        discount: zod_1.z.number({ required_error: 'Discount is Required' }).optional(),
        title: zod_1.z.string({ required_error: 'Title is Required' }).optional(),
    }),
});
exports.CouponValidations = {
    createCouponValidationSchema,
    updateCouponValidationSchema,
};
