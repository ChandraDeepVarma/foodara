import express from "express";
import { loginAdmin } from "../controllers/authController.js";
import { logoutAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

export default router;
