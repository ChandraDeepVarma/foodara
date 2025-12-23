import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "admins",
    timestamp: true,
  }
);

// NOTE:
// This table is intended to store ONLY ONE admin record (site owner).
// Admin creation API will enforce single-admin rule.
// */

export default Admin;
