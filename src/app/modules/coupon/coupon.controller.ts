import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CouponServices } from './coupon.service';

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.createCouponIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon created successfully',
    data: result,
  });
});

const getAllCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.getAllCouponsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon fetched successfully',
    data: result,
  });
});

const updateCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.updateCouponFromDB(
    req.body,
    req.params.id,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon update successfully',
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.deleteCouponFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon delete successfully',
    data: result,
  });
});

export const CouponController = {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
};
