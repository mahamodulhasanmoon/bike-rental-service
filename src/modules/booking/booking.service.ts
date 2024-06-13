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
      { session, new: true },
    );

    // now Creating main Data
    const result = await Booking.create([payload], { session });
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

export const getAllBookingsService = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const Bookingqueries = new QueryBuilder(Booking.find({ userId }), query);

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

//  for return bike Service with Rental

export const returnBookingService = async (id: string) => {
  const bookingData: any = await Booking.findById(id).populate('bikeId');
  // Parse start time and current time
  const startTime = new Date((bookingData as IBooking)?.startTime).getTime();
  const currentTime = new Date().getTime();

  // Calculate the difference in milliseconds
  const totalRiding = (currentTime - startTime) / (1000 * 60 * 60);
  const ridingCost = totalRiding * (bookingData as any)?.bikeId.pricePerHour;

  const ridingSession = await startSession();
  ridingSession.startTransaction();

  try {
    // need to update bike conditions
    await Bike.findByIdAndUpdate(
      id,
      { isAvailable: true },
      { ridingSession, new: true },
    );

    //  now updated in main collection

    const ridingData: Partial<IBooking> = {
      returnTime: new Date(),
      totalCost: ridingCost,
      isReturned: true,
    };

    const result = await Booking.findByIdAndUpdate(
      bookingData._id,
      ridingData,
      { ridingSession, new: true },
    );

    ridingSession.commitTransaction();
    ridingSession.endSession();
    return result;
    // part 2 update rantal information
  } catch (error: any) {
    await ridingSession.abortTransaction();
    ridingSession.endSession();
    throw new CustomError(error.status, error.message);
  }
};
