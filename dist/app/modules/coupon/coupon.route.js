"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRoutes = void 0;
const express_1 = require("express");
const coupon_validation_1 = require("./coupon.validation");
const coupon_controller_1 = require("./coupon.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(coupon_validation_1.CouponValidations.createCouponValidationSchema), coupon_controller_1.CouponController.createCoupon);
router.get('/', coupon_controller_1.CouponController.getAllCoupon);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(coupon_validation_1.CouponValidations.updateCouponValidationSchema), coupon_controller_1.CouponController.updateCoupon);
router.delete('/:id', (0, auth_1.default)('admin'), coupon_controller_1.CouponController.deleteCoupon);
exports.CouponRoutes = router;
