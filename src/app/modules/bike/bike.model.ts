import { model, Schema } from "mongoose";
import { TBike } from "./bike.interface";

const BikeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
    image: { type: String, default: '' },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true }
  }, {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
  });
  
  // Create the Bike model
 const Bike = model<TBike>('Bike', BikeSchema);
 export default Bike