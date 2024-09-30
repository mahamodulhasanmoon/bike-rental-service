import { z } from 'zod';

// create bike document to validate using zod
const createBikeValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required' }),
    description: z.string({ required_error: 'Description is Required' }),
    pricePerHour: z.number({ required_error: 'Price per hour is Required' }),
    isAvailable: z.boolean().optional(),
    image: z.string({ required_error: 'Image is required' }),
    cc: z.number({ required_error: 'CC is Required' }),
    year: z.number({ required_error: 'Year is Required' }),
    model: z.string({ required_error: 'Model is Required' }),
    brand: z.string({ required_error: 'Brand is Required' }),
  }),
});

// update bike document to validate using zod
const updateBikeValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    isAvailable: z.boolean().optional(),
    image: z.string().url().optional(),
    cc: z.number().optional(),
    year: z.number().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
  }),
});

export const BikeValidations = {
  createBikeValidation,
  updateBikeValidation,
};
