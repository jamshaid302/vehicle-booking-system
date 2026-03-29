import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  updateBooking,
} from "./booking.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getBookings);
router.get("/:id", authMiddleware, getBookingById);
router.put("/:id", authMiddleware, updateBooking);
router.delete("/:id", authMiddleware, deleteBooking);

export default router;
