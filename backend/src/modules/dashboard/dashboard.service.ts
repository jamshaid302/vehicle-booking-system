import { Customer } from "../customer/customer.model";
import { Vehicle } from "../vehicle/vehicle.model";
import { Booking } from "../booking/booking.model";

export const getDashboardSummary = async () => {
  const [totalCustomers, totalVehicles, totalBookings, totalRevenueAgg] =
    await Promise.all([
      Customer.countDocuments(),
      Vehicle.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
      ]),
    ]);

  const totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0;

  return {
    totalCustomers,
    totalVehicles,
    totalBookings,
    totalRevenue,
  };
};
