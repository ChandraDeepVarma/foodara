import express from "express";
import { exportDatabase } from "../controllers/exportController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/export-db", authMiddleware, exportDatabase);

export default router;
