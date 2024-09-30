import { model, Schema } from 'mongoose';
import { TCopyCoupon } from './copyCoupon.interface';


const copyCouponModel = new Schema<TCopyCoupon>({
  coupon: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export const CopyCoupon = model<TCopyCoupon>('CopyCoupon', copyCouponModel);
