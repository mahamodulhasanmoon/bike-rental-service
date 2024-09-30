"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeValidations = void 0;
const zod_1 = require("zod");
// create bike document to validate using zod
const createBikeValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is Required' }),
        description: zod_1.z.string({ required_error: 'Description is Required' }),
        pricePerHour: zod_1.z.number({ required_error: 'Price per hour is Required' }),
        isAvailable: zod_1.z.boolean().optional(),
        image: zod_1.z.string({ required_error: 'Image is required' }),
        cc: zod_1.z.number({ required_error: 'CC is Required' }),
        year: zod_1.z.number({ required_error: 'Year is Required' }),
        model: zod_1.z.string({ required_error: 'Model is Required' }),
        brand: zod_1.z.string({ required_error: 'Brand is Required' }),
    }),
});
// update bike document to validate using zod
const updateBikeValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        isAvailable: zod_1.z.boolean().optional(),
        image: zod_1.z.string().url().optional(),
        cc: zod_1.z.number().optional(),
        year: zod_1.z.number().optional(),
        model: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
    }),
});
exports.BikeValidations = {
    createBikeValidation,
    updateBikeValidation,
};
