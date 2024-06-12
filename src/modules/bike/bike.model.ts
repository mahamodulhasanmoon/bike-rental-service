import { Schema, model } from 'mongoose';
import { IBike } from './bike.interface';

const bikeSchema = new Schema<IBike>({
  name: {
    type: String,
    required: [true, 'Bike name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  pricePerHour: {
    type: Number,
    required: [true, 'Price per hour is required'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  cc: {
    type: Number,
    required: [true, 'Engine capacity (cc) is required'],
  },
  year: {
    type: Number,
    required: [true, 'Manufacturing year is required'],
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select:0
  },
},{
  timestamps:true
});
// Query Middleware
bikeSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

bikeSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

bikeSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Bike = model<IBike>('Bike', bikeSchema);
