import { JwtPayload } from 'jsonwebtoken';
import { CopyCoupon } from './copy.model';

const upsertCopyCouponIntoDB = async (coupon: string, userId: JwtPayload) => {
  const upsertResult = await CopyCoupon.findOneAndUpdate(
    { userId: userId },
    { $set: { coupon: coupon } },
    { upsert: true, new: true },
  );

  return upsertResult;
};

const getCopyCouponFromDB = async (userId: JwtPayload) => {
  const result = await CopyCoupon.findOne({ userId: userId });

  return result;
};

export const CopyCouponService = {
  upsertCopyCouponIntoDB,
  getCopyCouponFromDB,
};
