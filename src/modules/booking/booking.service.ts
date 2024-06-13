import { Bike } from './../bike/bike.model';
import { startSession } from 'mongoose';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import { CustomError } from '../../errors/CustomError';

export const createBookingService = async (payload: Partial<IBooking>) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const bikeIsAvailable = await Bike.findOne({
      _id: payload.bikeId,
      isDeleted: { $ne: true },
    });

    //  Check All Validation so that sits don't Break

    if (!bikeIsAvailable) {
      throw new CustomError(404, 'Bike Not Found');
    }
    if (!bikeIsAvailable?.isAvailable) {
      throw new CustomError(404, 'Ride Already Booked');
    }
    //  Update Bike Information Session

     await Bike.findByIdAndUpdate(
      payload.bikeId,
      { isAvailable: false },
      { session, new: true } 
    );

    // now Creating main Data 
    const result = await Booking.create([payload],{session})
    await session.commitTransaction();
    session.endSession();
    


    return result;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new CustomError(error.status, error.message);
  }
};

// Get all Bookings

export const getAllBookingsService = async (query: Record<string, unknown>) => {
  const Bookingqueries = new QueryBuilder(Booking.find(), query);

  const result = await Bookingqueries.modelQuery;
  return result;
};

// update  Booking Service

export const updateBookingService = async (
  id: string,
  data: Partial<IBooking>,
) => {
  const result = await Booking.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const deleteBookingService = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};
