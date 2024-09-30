import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

// booking model schema
const bookingSchema = new Schema<TBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Bike',
  },
  startTime: {
    type: Date,
    required: true,
  },
  returnTime: {
    type: Date,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  paidStatus: {
    type: String,
    enum: ['no-paid', 'initial-paid', 'full-paid'],
    default: 'no-paid',
  },
  transactionId: {
    type: String,
    required: true,
  },
});

export const Booking = model<TBooking>('Booking', bookingSchema);
