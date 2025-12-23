import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import CMSContent from "../models/CMSContent.js";

// ---------------- CREATE INITIAL ADMIN ----------------
export const createInitialAdmin = async (req, res) => {
  try {
    const adminCount = await Admin.count();

    if (adminCount > 0) {
      return res.status(403).json({
        message: "Admin already exists",
      });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin created successfully",
      adminId: admin.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create admin",
      error: error.message,
    });
  }
};

// ---------------- CREATE INITIAL CMS CONTENT ----------------
export const createInitialCMSContent = async (req, res) => {
  try {
    const cmsCount = await CMSContent.count();

    if (cmsCount > 0) {
      return res.status(403).json({
        message: "CMS content already exists",
      });
    }

    const { aboutText, address, phone, email } = req.body;

    if (!aboutText || !address || !phone || !email) {
      return res.status(400).json({
        message: "All CMS fields are required",
      });
    }

    const cms = await CMSContent.create({
      aboutText,
      address,
      phone,
      email,
    });

    res.status(201).json({
      message: "CMS content created successfully",
      cmsId: cms.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create CMS content",
      error: error.message,
    });
  }
};
