import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UAParser } from "ua-parser-js";

import Admin from "../models/Admin.js";
import AdminActivityLog from "../models/AdminActivityLog.js";

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Basic validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // 2️⃣ Find admin
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 4️⃣ Create JWT
    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // ===============================
    // 🔐 LOGIN LOGGING (NEW)
    // ===============================

    // Parse browser & OS
    const parser = new UAParser(req.headers["user-agent"]);
    const ua = parser.getResult();

    // Get IP address
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Create log entry
    const log = await AdminActivityLog.create({
      adminId: admin.id,
      browser: ua.browser.name,
      os: ua.os.name,
      ipAddress,
      loginTime: new Date(),
    });

    // 5️⃣ Send response
    res.status(200).json({
      message: "Login successful",
      token,
      adminLogId: log.id, // IMPORTANT for logout
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

// ===============================
// 🔐 LOGOUT LOGGING (NEW)
// ===============================

export const logoutAdmin = async (req, res) => {
  try {
    const { adminLogId } = req.body;
    //console.log("LOGOUT API HIT", req.body); // 👈 ADD THIS

    if (!adminLogId) {
      return res.status(400).json({
        message: "Admin log id is required",
      });
    }

    await AdminActivityLog.update(
      { logoutTime: new Date() },
      { where: { id: adminLogId } }
    );

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};
