"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
// make booking validation using zod
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string({ required_error: 'Bike Id is required' }),
        startTime: zod_1.z.string({ required_error: 'Start time is required' }),
    }),
});
const updateBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        returnTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.number().optional(),
        isReturned: zod_1.z.boolean().optional(),
    }),
});
exports.BookingValidations = {
    createBookingValidationSchema,
    updateBookingValidationSchema,
};
