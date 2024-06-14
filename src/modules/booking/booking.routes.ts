import { Router } from 'express';
import {
  createBookingController,
  getAllBookingController,
  returnBookingController,
} from './booking.controller';
import { requestValidator } from '../../middlewares/requestValidator';
import { createBookingValidation } from './booking.validation';
import auth from '../../middlewares/auth';

export const rentalRoutes: Router = Router();

rentalRoutes.get('/', auth('user', 'admin'), getAllBookingController);
rentalRoutes.post(
  '/',
  auth('user', 'admin'),
  requestValidator(createBookingValidation),
  createBookingController,
);
rentalRoutes.put(
  '/:id/return',
  auth('admin'),
  returnBookingController,
);
