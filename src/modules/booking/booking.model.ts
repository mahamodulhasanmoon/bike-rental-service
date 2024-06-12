import  {  Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

// Define the Mongoose schema corresponding to the IBooking interface
const bookingSchema = new Schema<IBooking>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User ID is required'] },
  bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: [true, 'Bike ID is required'] },
  startTime: { type: Date, required: [true, 'Start time is required'] },
  returnTime: { type: Date, required: [true, 'Return time is required'] },
  totalCost: { type: Number, required: [true, 'Total cost is required'] },
  isReturned: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});



export const Booking = model<IBooking >('Booking', bookingSchema);


