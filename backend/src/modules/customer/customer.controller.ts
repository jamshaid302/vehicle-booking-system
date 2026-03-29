import { Request, Response, NextFunction } from "express";
import * as customerService from "./customer.service";

// Create customer
export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await customerService.createCustomer(req.body);

    res.status(201).json({
      success: true,
      data: result,
      message: "Customer created successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get all customers
export const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await customerService.getCustomers(req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

// Get customer by ID
export const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req?.params?.id;
    if (!id) throw { statusCode: 400, message: "ID is required" };

    const result = await customerService.getSingleCustomer(id || "");

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Update customer
export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) throw { statusCode: 400, message: "ID is required" };

    const result = await customerService.updateCustomer(id, req.body);

    res.status(200).json({
      success: true,
      data: result,
      message: "Customer updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Delete customer
export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) throw { statusCode: 400, message: "ID is required" };

    const result = await customerService.deleteCustomer(id);

    res.status(200).json({
      success: true,
      data: result,
      message: "Customer deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
