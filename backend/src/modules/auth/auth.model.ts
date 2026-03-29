import mongoose, { Schema } from "mongoose";
import { IAuth } from "./auth.interface";

const userSchema = new Schema<IAuth>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IAuth>("User", userSchema);
