import { Booking } from "./booking.model";
import { IBooking } from "./booking.interface";
import mongoose from "mongoose";

export const createBooking = async (payload: Partial<IBooking>) => {
  return await Booking.create(payload);
};

export const getBookings = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const pipeline: any[] = [];

  // Join with Customers and Vehicles
  pipeline.push(
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    { $unwind: "$customer" },
    {
      $lookup: {
        from: "vehicles",
        localField: "vehicle",
        foreignField: "_id",
        as: "vehicle",
      },
    },
    { $unwind: "$vehicle" },
  );

  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { "customer.name": { $regex: search, $options: "i" } },
          { "vehicle.name": { $regex: search, $options: "i" } },
        ],
      },
    });
  }

  pipeline.push({
    $facet: {
      data: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
      totalCount: [{ $count: "count" }],
    },
  });

  const result = await Booking.aggregate(pipeline);

  const data = result[0].data;
  const total = result[0].totalCount[0]?.count || 0;

  return {
    data,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const getSingleBooking = async (query: any) => {
  return await Booking.findOne({
    vehicle: query.vehicle,
    $or: [
      {
        startDate: { $lte: query.endDate },
        endDate: { $gte: query.startDate },
      },
    ],
  });
};

export const getBookingById = async (id: string) => {
  return await Booking.findById(id);
};

export const updateBooking = async (id: string, payload: Partial<IBooking>) => {
  return await Booking.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

export const deleteBooking = async (id: string) => {
  return await Booking.findByIdAndDelete(id);
};
