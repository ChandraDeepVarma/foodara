import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

// ===================Routes==================
import authRoutes from "./routes/authRoutes.js";
import setupRoutes from "./routes/setupRoutes.js";
import cmsRoutes from "./routes/cmsRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// =================models=================

import "./models/Admin.js";
import "./models/CMSContent.js";
import "./models/Dish.js";
import "./models/ContactMessage.js";

dotenv.config();

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================IMG UPLOAD ================== //
app.use("/uploads", express.static("uploads"));

// ================== ROUTE ==================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Foodara Backend API is running 🚀",
  });
});

app.use("/api/setup", setupRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cms", cmsRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api/contact", contactRoutes);

// ================== GLOBAL ERROR HANDLER ==================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

// ================== DATABASE CONNECTION ==================
sequelize
  .authenticate()
  .then(async () => {
    console.log("Database connected successfully ✅");

    await sequelize.sync();

    console.log("All models synced successfully 🗄️");
  })
  .catch((err) => {
    console.error("Database connection failed ❌", err);
  });

import authMiddleware from "./middlewares/authMiddleware.js";

app.get("/api/test/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    adminId: req.admin.id,
  });
});

export default app;
