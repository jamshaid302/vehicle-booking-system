import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as authService from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = await authService.createUser({
    email: req.body.email,
    password: hashed,
  });

  res.status(201).json({
    success: true,
    data: user,
    message: "User created successfully",
  });
};

export const login = async (req: Request, res: Response) => {
  const user = await authService.findOne(req?.body?.email);

  const isMatch = await bcrypt.compare(req.body.password, user?.password || "");

  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET || "secret");

  res.status(200).json({ success: true, token });
};
