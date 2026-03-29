import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IBooking extends Document {
  customer: mongoose.Schema.Types.ObjectId; // Customer ID
  vehicle: mongoose.Schema.Types.ObjectId; // Vehicle ID
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: "booked" | "cancelled";
}
