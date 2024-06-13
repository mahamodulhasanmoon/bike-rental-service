import { z } from 'zod';

export const createBookingValidation = z.object({
  body: z.object({
    bikeId: z
      .string({
        required_error: 'Bike name is required',
        invalid_type_error: 'Bike name must be a string',
      })
      .optional(),
    startTime: z.date({
      required_error: 'Time Is Required',
      invalid_type_error: 'Must Be TimeStamp',
    }),
  }),
});
