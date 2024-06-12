import { Types } from 'mongoose';

export interface IBooking {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  isReturned: boolean;
  isDeleted: boolean;
}
