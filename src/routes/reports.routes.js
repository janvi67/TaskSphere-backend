import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {roleMiddleware} from "../middleware/role.middleware.js";
import {taskReport} from "../controller/report.controller.js";

const router = express.Router();
router.get(
  "/tasks",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN", "ADMIN", "TEAM_LEADER"),
  taskReport
);

export default router;
