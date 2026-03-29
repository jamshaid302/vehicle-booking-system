import { Router } from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "./customer.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createCustomer);
router.get("/", authMiddleware, getCustomers);
router.get("/:id", authMiddleware, getCustomerById);
router.put("/:id", authMiddleware, updateCustomer);
router.delete("/:id", authMiddleware, deleteCustomer);

export default router;
