import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import { getDashboardStats } from "../controller/dashboard.controller.js";

const router = express.Router();

router.get("/",authMiddleware,getDashboardStats);

export default router;
