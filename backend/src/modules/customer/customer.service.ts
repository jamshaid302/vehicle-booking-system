import mongoose from "mongoose";
import { Customer } from "./customer.model";
import { ICustomer } from "./customer.interface";

export const createCustomer = async (payload: Partial<ICustomer>) => {
  return await Customer.create(payload);
};

export const getCustomers = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const filter = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };

  const result = await Customer.aggregate([
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

export const getSingleCustomer = async (id: string) => {
  return await Customer.findById(id);
};

export const updateCustomer = async (
  id: string,
  payload: Partial<ICustomer>,
) => {
  return await Customer.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

export const deleteCustomer = async (id: string) => {
  return await Customer.findByIdAndDelete(id);
};
