import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {roleMiddleware} from "../middleware/role.middleware.js";
import User from "../modals/user.modal.js";

const router = express.Router();


router.get(
  "/",
  authMiddleware,
  roleMiddleware("TEAM_LEADER"),
  async (req, res) => {
    const members = await User.find({
      role: "EMPLOYEE"
    }).select("name email role");
    res.json(members);
  }
);
