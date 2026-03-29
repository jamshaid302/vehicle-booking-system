import { Router } from "express";
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getAvailableVehicles,
} from "./vehicle.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createVehicle);
router.get("/", authMiddleware, getVehicles);
router.get("/available", authMiddleware, getAvailableVehicles);
router.get("/:id", authMiddleware, getVehicleById);
router.put("/:id", authMiddleware, updateVehicle);
router.delete("/:id", authMiddleware, deleteVehicle);

export default router;
