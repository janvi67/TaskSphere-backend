import express from "express"
import {login} from "../controller/auth.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {roleMiddleware} from "../middleware/role.middleware.js";
import {register} from "../controller/auth.controller.js";

const router=express.Router();
router.post("/login",login);
router.post("/register",authMiddleware,roleMiddleware("SUPER_ADMIN","ADMIN"),register);

export default router;