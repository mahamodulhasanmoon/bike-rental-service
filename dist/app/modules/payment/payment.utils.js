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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../../config"));
dotenv_1.default.config();
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post(config_1.default.payment_url, {
        store_id: config_1.default.store_id,
        tran_id: paymentData.transactionId,
        success_url: `${config_1.default.url}/api/payments/confirmation?transactionId=${paymentData.transactionId}&status=success&paidStatus=${paymentData.paidStatus}`,
        fail_url: `${config_1.default.url}/api/payments/confirmation?status=failed`,
        cancel_url: config_1.default.client_url,
        amount: paymentData.amount,
        currency: 'BDT',
        signature_key: config_1.default.signature_key,
        desc: 'Merchant Registration Payment',
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_add1: paymentData.customerAddress,
        cus_add2: 'N/A',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1206',
        cus_country: 'Bangladesh',
        cus_phone: paymentData.customerPhone,
        type: 'json',
    });
    return res.data;
});
exports.initiatePayment = initiatePayment;
const verifyPayment = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://secure.aamarpay.com/api/v1/trxcheck/request.php', {
        params: {
            store_id: config_1.default.store_id,
            signature_key: config_1.default.signature_key,
            type: 'json',
            request_id: transactionId,
        },
    });
    return response.data;
});
exports.verifyPayment = verifyPayment;
