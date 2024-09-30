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
exports.CopyCouponService = void 0;
const copy_model_1 = require("./copy.model");
const upsertCopyCouponIntoDB = (coupon, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const upsertResult = yield copy_model_1.CopyCoupon.findOneAndUpdate({ userId: userId }, { $set: { coupon: coupon } }, { upsert: true, new: true });
    return upsertResult;
});
const getCopyCouponFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield copy_model_1.CopyCoupon.findOne({ userId: userId });
    return result;
});
exports.CopyCouponService = {
    upsertCopyCouponIntoDB,
    getCopyCouponFromDB,
};
