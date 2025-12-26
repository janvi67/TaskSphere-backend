import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {roleMiddleware} from "../middleware/role.middleware.js";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  getTaskHistory
} from "../controller/task.controller.js";

const router = express.Router();

// Admin & Team Leader can assign
router.post(
  "/",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN", "ADMIN", "TEAM_LEADER"),
  createTask
);

// All logged-in users
router.get("/", authMiddleware, getTasks);

// Employee / Staff update status
router.put("/:id/status", authMiddleware, updateTaskStatus);

// Task history
router.get("/:id/history", authMiddleware, getTaskHistory);

export default router;
