import { QueryBuilder } from '../../builder/QueryBuilder';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

export const createBookingService = async (data: IBooking) => {
  const result = await Booking.create(data);
  return result;
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
