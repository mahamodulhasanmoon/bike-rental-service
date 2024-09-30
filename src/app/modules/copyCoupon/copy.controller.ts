import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CopyCouponService } from './copyCoupon.service';

const upsertCopyCoupon = catchAsync(async (req, res) => {
  const result = await CopyCouponService.upsertCopyCouponIntoDB(
    req.body.coupon,
    req.user.id,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Copy Coupon successfully',
    data: result,
  });
});

const getCopyCoupon = catchAsync(async (req, res) => {
  const result = await CopyCouponService.getCopyCouponFromDB(req.user.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Copy Coupon retrieved successfully',
    data: result,
  });
});

export const CopyCouponController = {
  upsertCopyCoupon,
  getCopyCoupon,
};
