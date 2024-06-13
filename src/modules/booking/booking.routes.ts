import { Router } from 'express';
import {
  createBookingController,
  getAllBookingController,
} from './booking.controller';
import { requestValidator } from '../../middlewares/requestValidator';
import { createBookingValidation } from './booking.validation';

export const rentalRoutes: Router = Router();

rentalRoutes.get('/', getAllBookingController);
rentalRoutes.get(
  '/',
  requestValidator(createBookingValidation),
  createBookingController,
);
