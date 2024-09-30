import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

// validate request using zod
const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;
