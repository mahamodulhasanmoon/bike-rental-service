import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { BookingController } from './booking.controller';

const router = Router();

// all booking routes
router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingController.createBooking,
);

// all booking routes
router.put(
  '/pay/:id',
  auth('admin', 'user'),
  BookingController.updateBookingWithPayment,
);

router.put(
  '/:id/return',
  auth('admin'),
  validateRequest(BookingValidations.updateBookingValidationSchema),
  BookingController.updateBooking,
);

router.get('/', auth('admin', 'user'), BookingController.getMyAllBookings);
router.get('/initial-paid', auth('admin'), BookingController.getMyAllBookingsForAdmin);

export const BookingRoutes = router;
