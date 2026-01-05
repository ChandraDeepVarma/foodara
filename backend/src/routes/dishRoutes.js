import express from "express";
import upload from "../middlewares/cloudinaryUpload.js";

import {
  getDishes,
  createDish,
  updateDish,
  deleteDish,
} from "../controllers/dishController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getDishes);

// Admin
router.post("/", authMiddleware, upload.single("image"), createDish);
router.put("/:id", authMiddleware, updateDish);
router.delete("/:id", authMiddleware, deleteDish);

export default router;
