import { z } from "zod";

const copyCouponValidationSchema = z.object({
    body: z.object({
        coupon: z.string({required_error: "Coupon is required"}),
    })
})

export const CopyCouponValidation = {
    copyCouponValidationSchema,
};