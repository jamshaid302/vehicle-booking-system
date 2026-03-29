import { Vehicle } from "./vehicle.model";
import { IVehicle } from "./vehicle.interface";
import mongoose from "mongoose";

export const createVehicle = async (payload: Partial<IVehicle>) => {
  return await Vehicle.create(payload);
};

export const getVehicles = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const filter = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { type: { $regex: search, $options: "i" } },
    ],
  };

  const result = await Vehicle.aggregate([
    { $match: filter },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ]);

  const data = result[0].data;
  const total = result[0].totalCount[0]?.count || 0;

  return {
    data,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const getAvailableVehicles = async () => {
  const data = await Vehicle.find({ available: true });
  return { data };
};

export const getVehicleById = async (id: string) => {
  return await Vehicle.findById(id);
};

export const updateVehicle = async (id: string, payload: Partial<IVehicle>) => {
  return await Vehicle.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

export const deleteVehicle = async (id: string) => {
  return await Vehicle.findByIdAndDelete(id);
};
