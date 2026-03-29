import { Router } from "express";
import * as dashboardController from "../dashboard/dashboard.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();

router.get("/summary", authMiddleware, dashboardController.getDashboardSummary);

export default router;
