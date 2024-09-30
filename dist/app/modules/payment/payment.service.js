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
exports.PaymentServices = void 0;
const config_1 = __importDefault(require("../../config"));
const booking_model_1 = require("../booking/booking.model");
// import { verifyPayment } from './payment.utils';
const confirmationService = (transactionId, status, paidStatus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const verifyResponse = await verifyPayment(transactionId);
        console.log(status);
        if (status === 'success') {
            yield booking_model_1.Booking.findOneAndUpdate({ transactionId }, {
                paidStatus: paidStatus === 'full-paid'
                    ? 'full-paid'
                    : paidStatus === 'initial-paid'
                        ? 'initial-paid'
                        : 'no-paid',
            }, { new: true });
        }
        const successTemplate = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            .success {
              color: #4CAF50;
            }
            .cancel {
              color: #f44336;
            }
            .redirect-link {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              color: #fff;
            }
            .success-link {
              background-color: #4CAF50;
            }
            .cancel-link {
              background-color: #f44336;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="${status === 'success' ? 'success' : 'cancel'}">
              Payment ${status === 'success' ? 'Successful' : 'Canceled'}
            </h1>
            <a href="${config_1.default.client_url}/dashboard/my-rental-paid" class="redirect-link ${status === 'success' ? 'success-link' : 'cancel-link'}">
              ${status === 'success' ? 'Go to Dashboard' : 'Retry Payment'}
            </a>
          </div>
        </body>
      </html>
    `;
        return successTemplate;
    }
    catch (error) {
        console.error('Error in confirmationService:', error);
        throw new Error('Payment verification failed.');
    }
});
exports.PaymentServices = {
    confirmationService,
};
