import express from "express";
import {
  submitContactMessage,
  getAllContactMessages,
} from "../controllers/contactController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.post("/", submitContactMessage);

// Admin
router.get("/", authMiddleware, getAllContactMessages);

export default router;
