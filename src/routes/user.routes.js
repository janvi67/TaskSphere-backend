// routes/user.routes.js
import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {roleMiddleware} from "../middleware/role.middleware.js";
import User from "../modals/user.modal.js";

const router = express.Router();
router.get(
  "/",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN", "ADMIN"),
  async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
  }
);
export default router;