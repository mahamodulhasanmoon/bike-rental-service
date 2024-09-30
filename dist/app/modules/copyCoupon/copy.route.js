"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyCouponRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const copyCoupon_validation_1 = require("./copyCoupon.validation");
const copy_controller_1 = require("./copy.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.put('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(copyCoupon_validation_1.CopyCouponValidation.copyCouponValidationSchema), copy_controller_1.CopyCouponController.upsertCopyCoupon);
router.get('/', (0, auth_1.default)('user'), copy_controller_1.CopyCouponController.getCopyCoupon);
exports.CopyCouponRoute = router;
