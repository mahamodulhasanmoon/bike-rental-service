"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BikeSchema = new mongoose_1.Schema({
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
const Bike = (0, mongoose_1.model)('Bike', BikeSchema);
exports.default = Bike;
