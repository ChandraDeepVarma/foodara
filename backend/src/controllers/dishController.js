import Dish from "../models/Dish.js";

// -------- GET ALL / FILTER BY CATEGORY (PUBLIC) --------
export const getDishes = async (req, res) => {
  try {
    const { category } = req.query;

    const where = category ? { category } : {};

    const dishes = await Dish.findAll({ where });

    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dishes",
      error: error.message,
    });
  }
};

export const createDish = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    // const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const imageUrl = req.file ? req.file.path : null;

    const dish = await Dish.create({
      name,
      price,
      category,
      imageUrl,
    });

    res.status(201).json(dish);
  } catch (error) {
    res.status(500).json({ message: "Failed to create dish" });
  }
};

// -------- UPDATE DISH (ADMIN) --------
export const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findByPk(id);

    if (!dish) {
      return res.status(404).json({
        message: "Dish not found",
      });
    }

    await dish.update(req.body);

    res.status(200).json({
      message: "Dish updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update dish",
      error: error.message,
    });
  }
};

// -------- DELETE DISH (ADMIN) --------
export const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findByPk(id);

    if (!dish) {
      return res.status(404).json({
        message: "Dish not found",
      });
    }

    await dish.destroy();

    res.status(200).json({
      message: "Dish deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete dish",
      error: error.message,
    });
  }
};
