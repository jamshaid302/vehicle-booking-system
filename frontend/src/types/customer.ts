export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  pages?: number;
  total?: number;
}

export interface ICustomerListResponse {
  data: ICustomer[];
  page: number;
  pages: number;
  total: number;
  success: boolean;
}
