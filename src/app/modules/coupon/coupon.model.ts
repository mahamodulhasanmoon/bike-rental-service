import { model, Schema } from 'mongoose';
import { TCoupon } from './coupon.interface';

const couponSchema = new Schema<TCoupon>({
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

export const Coupon = model<TCoupon>('Coupon', couponSchema);
