import ContactMessage from "../models/ContactMessage.js";
import axios from "axios"; // ⬅️ NEW

// -------- SUBMIT CONTACT MESSAGE (PUBLIC) --------
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message, captchaToken } = req.body; // ⬅️ NEW (captchaToken)

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required",
      });
    }

    // ⬇️⬇️ CAPTCHA VERIFICATION (NEW BLOCK)
    if (!captchaToken) {
      return res.status(400).json({
        message: "Captcha verification required",
      });
    }

    const captchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY, // ⬅️ NEW (.env)
          response: captchaToken,
        },
      }
    );

    if (!captchaResponse.data.success) {
      return res.status(403).json({
        message: "Captcha verification failed",
      });
    }
    // ⬆️⬆️ CAPTCHA VERIFICATION END

    await ContactMessage.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });
  }
};

// -------- GET ALL CONTACT MESSAGES (ADMIN) --------
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contact messages",
      error: error.message,
    });
  }
};
