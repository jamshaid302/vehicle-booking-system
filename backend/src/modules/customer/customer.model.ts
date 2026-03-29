import mongoose, { Schema } from "mongoose";
import { ICustomer } from "./customer.interface";

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
  },
  { timestamps: true },
);

export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
