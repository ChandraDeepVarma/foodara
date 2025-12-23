import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Dish = sequelize.define(
  "Dish",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    category: {
      type: DataTypes.ENUM("indian", "italian", "chinese"),
      allowNull: false,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "dishes",
    timestamps: true,
  }
);

export default Dish;
