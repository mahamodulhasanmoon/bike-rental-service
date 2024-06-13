import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

// Define the Mongoose schema corresponding to the IBooking interface
const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      ref: 'Bike',
      required: [true, 'Bike is required'],
    },
    startTime: { type: Date, required: [true, 'Start time is required'] },
    returnTime: { type: Date, default: null },
    totalCost: {
      type: Number,
      default: 0,
    },
    isReturned: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware
bookingSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

bookingSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

bookingSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Booking = model<IBooking>('Booking', bookingSchema);
