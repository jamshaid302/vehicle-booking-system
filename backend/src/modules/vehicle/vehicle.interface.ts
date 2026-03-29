import { Document } from "mongoose";

export interface IVehicle extends Document {
  name: string;
  vehicleModel: string;
  plateNumber: string;
  rentPrice: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}
