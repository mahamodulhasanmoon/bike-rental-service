import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { BikeRoutes } from '../modules/bike/bike.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { paymentRoutes } from '../modules/payment/payment.route';
import { CouponRoutes } from '../modules/coupon/coupon.route';
import { CopyCouponRoute } from '../modules/copyCoupon/copy.route';

const router = Router();

// parent route assign
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: BookingRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },
  {
    path: '/coupons',
    route: CouponRoutes,
  },
  {
    path: '/copy-coupon',
    route: CopyCouponRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
