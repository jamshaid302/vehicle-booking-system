import { Request, Response, NextFunction } from "express";
import * as dashboardService from "../dashboard/dashboard.service";

export const getDashboardSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await dashboardService.getDashboardSummary();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
