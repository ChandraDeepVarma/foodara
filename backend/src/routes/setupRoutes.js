import express from "express";
import {
  createInitialAdmin,
  createInitialCMSContent,
} from "../controllers/setupController.js";

const router = express.Router();

router.post("/admin", createInitialAdmin);
router.post("/cms", createInitialCMSContent);

export default router;
