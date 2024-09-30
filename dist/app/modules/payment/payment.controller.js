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
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const confirmationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield payment_service_1.PaymentServices.confirmationService(req.query.transactionId, req.query.status, req.query.paidStatus);
        res.send(result);
    }
    catch (error) {
        console.error('Error in confirmationController:', JSON.stringify(error));
        res.status(500).send('An error occurred while processing the payment.');
    }
});
exports.PaymentController = {
    confirmationController,
};
