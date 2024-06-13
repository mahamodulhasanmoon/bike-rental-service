import { Router } from 'express';
import {
  createBookingController,
  getAllBookingController,
} from './booking.controller';
import { requestValidator } from '../../middlewares/requestValidator';
import { createBookingValidation } from './booking.validation';
import auth from '../../middlewares/auth';

export const rentalRoutes: Router = Router();

rentalRoutes.get('/', getAllBookingController);
rentalRoutes.post(
  '/',
  auth('user', 'admin'),
  requestValidator(createBookingValidation),
  createBookingController,
);
