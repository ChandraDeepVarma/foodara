import ContactMessage from "../models/ContactMessage.js";

// -------- SUBMIT CONTACT MESSAGE (PUBLIC) --------
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required",
      });
    }

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
