"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const bike_route_1 = require("../modules/bike/bike.route");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_route_1 = require("../modules/booking/booking.route");
const payment_route_1 = require("../modules/payment/payment.route");
const coupon_route_1 = require("../modules/coupon/coupon.route");
const copy_route_1 = require("../modules/copyCoupon/copy.route");
const router = (0, express_1.Router)();
// parent route assign
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/bikes',
        route: bike_route_1.BikeRoutes,
    },
    {
        path: '/rentals',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/payments',
        route: payment_route_1.paymentRoutes,
    },
    {
        path: '/coupons',
        route: coupon_route_1.CouponRoutes,
    },
    {
        path: '/copy-coupon',
        route: copy_route_1.CopyCouponRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
