import { api } from "./api";
import type { IVehicle, IVehicleListResponse } from "../types/vehicle";

export const getVehicles = (
  page: number,
  limit: number,
  searchTerm: string = "",
) =>
  api.get<IVehicleListResponse>(
    `/vehicles?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}`,
  );

export const getAvailableVehicles = () =>
  api.get<IVehicleListResponse>("vehicles/available");

export const createVehicle = (data: Partial<IVehicle>) =>
  api.post("/vehicles", data);

export const updateVehicle = (id: string, data: Partial<IVehicle>) =>
  api.put(`/vehicles/${id}`, data);

export const deleteVehicle = (id: string) => api.delete(`/vehicles/${id}`);
