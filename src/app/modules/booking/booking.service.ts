import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

import { initiatePayment } from '../payment/payment.utils';
import { User } from '../user/user.model';
import { TPaymentInfo } from '../../types/payment.interface';
import Bike from '../bike/bike.model';


// booking create service
const createBookingIntoDB = async (
  payload: TBooking,
  loggedUser: JwtPayload,
) => {
  const bookingData = {
    ...payload,
    userId: loggedUser?.id,
  };

  // find bike and update available status
  await Bike.findByIdAndUpdate(payload.bikeId, {
    isAvailable: false,
  });

  const user = await User.findById(loggedUser?.id);
  const transactionId = `TXN${Date.now()}${Math.floor(10000 + Math.random() * 90000)}`;

  const paymentInfo: TPaymentInfo = {
    transactionId,
    amount: '100',
    customerName: user?.name,
    customerEmail: user?.email,
    customerPhone: user?.phone,
    customerAddress: user?.address,
    paidStatus: 'initial-paid',
  };

  const paymentSession = await initiatePayment(paymentInfo);

  const bookingWithPayment = {
    ...bookingData,
    transactionId,
  };

  const result = await Booking.create(bookingWithPayment);

  return { result, paymentSession };
};

const updateBookingWithPayment = async (
  id: string,
  loggedUser: JwtPayload,
  amount: string,
) => {
  const findBookedBike = await Booking.findById(id);

  if (!findBookedBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rentals not found');
  }

  const user = await User.findById(loggedUser?.id);
  const transactionId = `TXN${Date.now()}${Math.floor(10000 + Math.random() * 90000)}`;

  const paymentInfo: TPaymentInfo = {
    transactionId,
    amount: amount,
    customerName: user?.name,
    customerEmail: user?.email,
    customerPhone: user?.phone,
    customerAddress: user?.address,
    paidStatus: 'full-paid',
  };

  const paymentSession = await initiatePayment(paymentInfo);

  const bookingWithPayment = {
    paidStatus: 'full-paid',
    transactionId,
  };

  const result = await Booking.findByIdAndUpdate(id, {
    paidStatus: bookingWithPayment.paidStatus,
    transactionId: bookingWithPayment.transactionId,
  });

  return { result, paymentSession };
};

// update booking
const updateBookingIntoDB = async (id: string) => {
  // find is booking by id
  const findBookedBike = await Booking.findById(id);

  //   find bike using the bikeId in the findBookedBike variable
  const findBike = await Bike.findById(findBookedBike?.bikeId);

  //   check not find the booked bike then send error
  if (!findBookedBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rentals not found');
  }

  //   get current date and booked time date
  const currentTime = new Date().getTime();
  const bookedTime = findBookedBike?.startTime.getTime();

  //   make the hours different
  const differenceHours = (currentTime - bookedTime) / (1000 * 60 * 60);

  //   calculation it and multiply that hours and price per hour
  const totalCost = Number(differenceHours) * Number(findBike?.pricePerHour);

  // find bike and update available status true
  await Bike.findByIdAndUpdate(findBookedBike?.bikeId, {
    isAvailable: true,
  });

  //   update return bike booking rentals
  const result = await Booking.findByIdAndUpdate(
    id,
    {
      returnTime: new Date(),
      totalCost: totalCost.toFixed(0),
      isReturned: true,
    },
    { new: true },
  );

  return result;
};

// get all booking
const getMyAllBookingsIntoDB = async (
  loggedUser: JwtPayload,
  paidStatus: string,
) => {
  let result;
 
  if (paidStatus === 'initial-paid') {
    result = await Booking.find({
      userId: loggedUser?.id,
      paidStatus: 'initial-paid',
      isReturned: true,
    }).populate('bikeId');
  } else if (paidStatus === 'full-paid') {
    result = await Booking.find({
      userId: loggedUser?.id,
      paidStatus: 'full-paid',
      isReturned: true,
    }).populate('bikeId');
  } else {
    result = await Booking.find({
      userId: loggedUser?.id,
    }).populate('bikeId');
  }

  return result;
};

const getMyAllBookingsForAdminIntoDB = async () => {
  const result = await Booking.find().populate('bikeId');

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  updateBookingIntoDB,
  getMyAllBookingsIntoDB,
  updateBookingWithPayment,
  getMyAllBookingsForAdminIntoDB,
};
