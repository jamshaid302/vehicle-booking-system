import mongoose, { Schema } from "mongoose";
import { IVehicle } from "./vehicle.interface";

const vehicleSchema = new Schema<IVehicle>(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    plateNumber: {
      type: String,
      required: [true, "Plate number is required. And it should be unique."],
      unique: true,
    },
    rentPrice: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Vehicle = mongoose.model<IVehicle>("Vehicle", vehicleSchema);
