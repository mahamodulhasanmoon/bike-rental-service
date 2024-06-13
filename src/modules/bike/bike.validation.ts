import { z } from 'zod';

export const createBikeValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Bike name is required',
      invalid_type_error: 'Bike name must be a string',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    pricePerHour: z.number({
      required_error: 'Price per hour is required',
      invalid_type_error: 'Price per hour must be a number',
    }),
    isAvailable: z
      .boolean({
        required_error: 'Availability status is required',
        invalid_type_error: 'Availability status must be a boolean',
      })
      .default(true),
    cc: z.number({
      required_error: 'Engine capacity (cc) is required',
      invalid_type_error: 'Engine capacity (cc) must be a number',
    }),
    year: z.number({
      required_error: 'Manufacturing year is required',
      invalid_type_error: 'Manufacturing year must be a number',
    }),
    model: z.string({
      required_error: 'Model is required',
      invalid_type_error: 'Model must be a string',
    }),
    brand: z.string({
      required_error: 'Brand is required',
      invalid_type_error: 'Brand must be a string',
    }),
  }),
});

export const updateBikeValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Bike name is required',
        invalid_type_error: 'Bike name must be a string',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
    pricePerHour: z
      .number({
        required_error: 'Price per hour is required',
        invalid_type_error: 'Price per hour must be a number',
      })
      .optional(),
    isAvailable: z
      .boolean({
        required_error: 'Availability status is required',
        invalid_type_error: 'Availability status must be a boolean',
      })
      .default(true),
    cc: z
      .number({
        required_error: 'Engine capacity (cc) is required',
        invalid_type_error: 'Engine capacity (cc) must be a number',
      })
      .optional(),
    year: z
      .number({
        required_error: 'Manufacturing year is required',
        invalid_type_error: 'Manufacturing year must be a number',
      })
      .optional(),
    model: z
      .string({
        required_error: 'Model is required',
        invalid_type_error: 'Model must be a string',
      })
      .optional(),
    brand: z
      .string({
        required_error: 'Brand is required',
        invalid_type_error: 'Brand must be a string',
      })
      .optional(),
  }),
});
