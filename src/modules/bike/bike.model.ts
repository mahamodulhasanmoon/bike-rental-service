import  {  Schema, model } from 'mongoose';
import { IBike } from './bike.interface';

const bikeSchema = new Schema<IBike>({
  name: { type: String, required: [true, 'Bike name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  pricePerHour: { type: Number, required: [true, 'Price per hour is required'] },
  isAvailable: { type: Boolean, default: true },
  cc: { type: Number, required: [true, 'Engine capacity (cc) is required'] },
  year: { type: Number, required: [true, 'Manufacturing year is required'] },
  model: { type: String, required: [true, 'Model is required'] },
  brand: { type: String, required: [true, 'Brand is required'] },
});



export const Bike = model<IBike>('Bike', bikeSchema);


