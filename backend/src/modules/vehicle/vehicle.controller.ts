import { Request, Response, NextFunction } from "express";
import * as vehicleService from "./vehicle.service";

// Create Vehicle
export const createVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await vehicleService.createVehicle(req.body);
    res.status(201).json({
      success: true,
      data: result,
      message: "Vehicle created successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get all Vehicles
export const getVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await vehicleService.getVehicles(req.query);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

// Get Available Vehicles
export const getAvailableVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await vehicleService.getAvailableVehicles();
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

// Get Vehicle by ID
export const getVehicleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) throw { statusCode: 400, message: "ID is required" };

    const result = await vehicleService.getVehicleById(id);
    if (!result) throw { statusCode: 404, message: "Vehicle not found" };

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Update Vehicle
export const updateVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) throw { statusCode: 400, message: "ID is required" };

    const result = await vehicleService.updateVehicle(id, req.body);
    if (!result) throw { statusCode: 404, message: "Vehicle not found" };

    res.status(200).json({
      success: true,
      data: result,
      message: "Vehicle updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Delete Vehicle
export const deleteVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) throw { statusCode: 400, message: "ID is required" };

    const result = await vehicleService.deleteVehicle(id);
    if (!result) throw { statusCode: 404, message: "Vehicle not found" };

    res.status(200).json({
      success: true,
      data: result,
      message: "Vehicle deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
