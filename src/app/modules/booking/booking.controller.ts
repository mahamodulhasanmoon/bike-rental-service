import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

// create booking controller

const createBooking = catchAsync(async (req, res) => {
  const { result, paymentSession } = await BookingServices.createBookingIntoDB(
    req.body,
    req.user,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
    paymentSession,
  });
});

const updateBookingWithPayment = catchAsync(async (req, res) => {
  const { result, paymentSession } =
    await BookingServices.updateBookingWithPayment(
      req.params.id,
      req.user,
      req.body.amount,
    );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
    paymentSession,
  });
});

// update booking or return bike controller
const updateBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.updateBookingIntoDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully',
    data: result,
  });
});

// get my all bookings
const getMyAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getMyAllBookingsIntoDB(
    req.user,
    req.query.paidStatus as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

const getMyAllBookingsForAdmin = catchAsync(async (req, res) => {
  const result = await BookingServices.getMyAllBookingsForAdminIntoDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  updateBooking,
  getMyAllBookings,
  updateBookingWithPayment,
  getMyAllBookingsForAdmin,
};
