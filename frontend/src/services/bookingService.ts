import { api } from "./api";
import type { IBooking, IBookingListResponse } from "../types/booking";

export const getBookings = (
  page = 1,
  limit = 10,
  searchTerm: string = "",
  signal?: AbortSignal,
) =>
  api.get<IBookingListResponse>(
    `/bookings?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}`,
    { signal },
  );

export const createBooking = (data: Partial<IBooking>) =>
  api.post("/bookings", data);

export const updateBooking = (id: string, data: Partial<IBooking>) =>
  api.put(`/bookings/${id}`, data);

export const deleteBooking = (id: string) => api.delete(`/bookings/${id}`);
