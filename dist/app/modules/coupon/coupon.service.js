"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponServices = void 0;
const coupon_model_1 = require("./coupon.model");
const createCouponIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.create(payload);
    return result;
});
const getAllCouponsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.find();
    return result;
});
const updateCouponFromDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteCouponFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.findByIdAndDelete(id);
    return result;
});
exports.CouponServices = {
    createCouponIntoDB,
    getAllCouponsFromDB,
    updateCouponFromDB,
    deleteCouponFromDB,
};
