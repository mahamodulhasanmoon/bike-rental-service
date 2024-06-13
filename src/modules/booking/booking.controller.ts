import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import {
  createBookingService,
  deleteBookingService,
  getAllBookingsService,
  returnBookingService,
  updateBookingService,
} from './booking.service';
import { sendResponse } from '../../utils/sendResponse';

export const createBookingController: RequestHandler = catchAsync(
  async (req, res) => {
    const userId = req.user.userId;

    const result = await createBookingService({
      ...req.body,
      userId: userId,
    });
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Booking added successfully',
      data: result,
    });
  },
);

export const getAllBookingController: RequestHandler = catchAsync(
  async (req, res) => {
    const userId = req.user.userId
    const result = await getAllBookingsService(userId,req.query);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Booking data fetched successfully',
      data: result,
    });
  },
);
export const updateBookingController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await updateBookingService(req.params.id, req.body);
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Booking updated successfully',
      data: result,
    });
  },
);

// For Delete Bookings
export const deleteBookingController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await deleteBookingService(req.params.id);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Booking deleted successfully',
      data: result,
    });
  },
);



// for Return 

export const returnBookingController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await returnBookingService(req.params.id);
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Booking returned successfully',
      data: result,
    });
  },
);