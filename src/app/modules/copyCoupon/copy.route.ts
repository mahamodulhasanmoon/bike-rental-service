import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CopyCouponValidation } from './copyCoupon.validation';
import { CopyCouponController } from './copy.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.put(
  '/',
  auth('user'),
  validateRequest(CopyCouponValidation.copyCouponValidationSchema),
  CopyCouponController.upsertCopyCoupon,
);

router.get('/', auth('user'), CopyCouponController.getCopyCoupon);

export const CopyCouponRoute = router;
