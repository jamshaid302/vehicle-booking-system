import { Request, Response, NextFunction } from "express";
import { IVehicle } from "../vehicle/vehicle.interface";
import * as bookingService from "./booking.service";
import * as vehicleService from "../vehicle/vehicle.service";

// Create booking
export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { vehicle, startDate, endDate } = req.body;

    if (!startDate || !endDate || !vehicle) {
      throw {
        statusCode: 400,
        message: "Start date, end date, and vehicle are required",
      };
    }

    // Check overlapping bookings
    const conflict = await bookingService.getSingleBooking({
      vehicle,
      startDate,
      endDate,
    });
    if (conflict) {
      throw {
        statusCode: 409,
        message: "Vehicle already booked for this period",
      };
    }

    const vehicleData = (await vehicleService.getVehicleById(
      vehicle,
    )) as IVehicle;
    if (!vehicleData) {
      throw { statusCode: 404, message: "Vehicle not found" };
    }

    const days =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24);
    const totalPrice = days * (vehicleData?.rentPrice || 0);

    const result = await bookingService.createBooking({
      ...req.body,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      data: result,
      message: "Booking created successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get all bookings
export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await bookingService.getBookings(req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

// Get booking by ID
export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) throw { statusCode: 400, message: "ID is required" };

    const result = await bookingService.getBookingById(id);
    if (!result) throw { statusCode: 404, message: "Booking not found" };

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Update booking
export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) throw { statusCode: 400, message: "ID is required" };

    const result = await bookingService.updateBooking(id, req.body);
    if (!result) throw { statusCode: 404, message: "Booking not found" };

    res.status(200).json({
      success: true,
      data: result,
      message: "Booking updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Delete booking
export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) throw { statusCode: 400, message: "ID is required" };

    const result = await bookingService.deleteBooking(id);
    if (!result) throw { statusCode: 404, message: "Booking not found" };

    res.status(200).json({
      success: true,
      data: result,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
