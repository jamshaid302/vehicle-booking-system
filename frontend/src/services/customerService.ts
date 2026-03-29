import { api } from "./api";
import type { ICustomer, ICustomerListResponse } from "../types/customer";

export const getCustomers = (
  page: number,
  limit: number,
  searchTerm: string = "",
) =>
  api.get<ICustomerListResponse>(
    `/customers?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}`,
  );

export const createCustomer = (data: Partial<ICustomer>) =>
  api.post("/customers", data);

export const updateCustomer = (id: string, data: Partial<ICustomer>) =>
  api.put(`/customers/${id}`, data);

export const deleteCustomer = (id: string) => api.delete(`/customers/${id}`);
