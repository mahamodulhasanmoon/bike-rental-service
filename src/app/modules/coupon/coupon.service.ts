import { TCoupon } from './coupon.interface';
import { Coupon } from './coupon.model';

const createCouponIntoDB = async (payload: TCoupon) => {
  const result = await Coupon.create(payload);

  return result;
};

const getAllCouponsFromDB = async () => {
    const result = await Coupon.find();

    return result
} 

const updateCouponFromDB = async (payload: Partial<TCoupon>, id: string) => {
  const result = await Coupon.findByIdAndUpdate(id, payload, { new: true });

  return result
};

const deleteCouponFromDB = async (id: string) => {
  const result = await Coupon.findByIdAndDelete(id);

  return result
};

export const CouponServices = {
  createCouponIntoDB,
  getAllCouponsFromDB,
  updateCouponFromDB,
  deleteCouponFromDB,
};
