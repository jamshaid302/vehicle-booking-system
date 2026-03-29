import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import customerRoutes from "./modules/customer/customer.routes";
import vehicleRoutes from "./modules/vehicle/vehicle.routes";
import bookingRoutes from "./modules/booking/booking.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const status = err.statusCode || 500;
  res
    .status(status)
    .json({ success: false, message: err.message || "Internal Server Error" });
});

export default app;
