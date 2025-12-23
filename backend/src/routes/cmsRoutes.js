import express from "express";
import {
  getCMSContent,
  updateCMSContent,
} from "../controllers/cmsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getCMSContent);

// Admin only
router.put("/", authMiddleware, updateCMSContent);

export default router;
