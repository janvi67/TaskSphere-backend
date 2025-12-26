import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {roleMiddleware} from "../middleware/role.middleware.js";


const router = express.Router();

router.get(
  "/admin-only",
  authMiddleware,
  roleMiddleware("ADMIN", "SUPER_ADMIN"),
  (req, res) => {
    res.json({ message: "Admin access granted" });
  }
);


export default router;
