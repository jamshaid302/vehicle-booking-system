export interface IVehicle {
  _id?: string;
  name: string;
  vehicleModel: string;
  plateNumber: string;
  rentPrice: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IVehicleListResponse {
  data: IVehicle[];
  page: number;
  pages: number;
  total: number;
  success: boolean;
}
