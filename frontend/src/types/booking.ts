export interface ICustomer {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface IVehicle {
  _id: string;
  name: string;
  rentPrice?: number;
}

export interface IBooking {
  _id: string;
  customer: string | ICustomer;
  vehicle: string | IVehicle;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status?: "booked" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}

export interface IBookingListResponse {
  data: IBooking[];
  page: number;
  pages: number;
  total: number;
  success: boolean;
}
