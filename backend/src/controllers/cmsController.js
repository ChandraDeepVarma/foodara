import CMSContent from "../models/CMSContent.js";

// ---------------- GET CMS CONTENT (PUBLIC) ----------------
export const getCMSContent = async (req, res) => {
  try {
    const cms = await CMSContent.findOne();

    if (!cms) {
      return res.status(404).json({
        message: "CMS content not found",
      });
    }

    res.status(200).json(cms);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch CMS content",
      error: error.message,
    });
  }
};

// ---------------- UPDATE CMS CONTENT (ADMIN) ----------------
export const updateCMSContent = async (req, res) => {
  try {
    const cms = await CMSContent.findOne();

    if (!cms) {
      return res.status(404).json({
        message: "CMS content not found",
      });
    }

    const { aboutText, address, phone, email } = req.body;

    await cms.update({
      aboutText,
      address,
      phone,
      email,
    });

    res.status(200).json({
      message: "CMS content updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update CMS content",
      error: error.message,
    });
  }
};
