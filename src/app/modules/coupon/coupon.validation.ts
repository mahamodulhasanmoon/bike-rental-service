import { z } from 'zod';

const createCouponValidationSchema = z.object({
  body: z.object({
    coupon: z.string({ required_error: 'Coupon is Required' }),
    discount: z.number({ required_error: 'Discount is Required' }),
    title: z.string({ required_error: 'Title is Required' }),
  }),
});

const updateCouponValidationSchema = z.object({
  body: z.object({
    coupon: z.string({ required_error: 'Coupon is Required' }).optional(),
    discount: z.number({ required_error: 'Discount is Required' }).optional(),
    title: z.string({ required_error: 'Title is Required' }).optional(),
  }),
});

export const CouponValidations = {
    createCouponValidationSchema,
    updateCouponValidationSchema,
}