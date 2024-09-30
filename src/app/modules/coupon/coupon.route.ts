import { Router } from 'express';
import { CouponValidations } from './coupon.validation';
import { CouponController } from './coupon.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(CouponValidations.createCouponValidationSchema),
  CouponController.createCoupon,
);

router.get(
  '/',
  CouponController.getAllCoupon,
);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(CouponValidations.updateCouponValidationSchema),
  CouponController.updateCoupon,
);

router.delete(
  '/:id',
  auth('admin'),
  CouponController.deleteCoupon,
);

export const CouponRoutes = router;
