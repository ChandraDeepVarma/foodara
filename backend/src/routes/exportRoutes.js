import express from "express";
import { exportDatabase } from "../controllers/exportController.js";

const router = express.Router();

router.post("/export-db", exportDatabase);

export default router;
