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

  // Access Token
  const accessToken = jwt.sign(
    { id: user?._id },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "15m" },
  );

  // Refresh Token
  const refreshToken = jwt.sign(
    { id: user?._id },
    process.env.JWT_REFRESH_SECRET || "refresh",
    { expiresIn: "7d" },
  );

  // Store refresh token in HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // HTTPS only
    sameSite: "strict",
    path: "/api/auth/refresh",
  });

  res.status(200).json({ success: true, accessToken });
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "15m" },
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    path: "/api/auth/refresh",
  });

  res.status(200).json({ success: true });
};
