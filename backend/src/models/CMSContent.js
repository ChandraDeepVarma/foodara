import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CMSContent = sequelize.define(
  "CMSContent",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    aboutText: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "cms_content",
    timestamps: true,
  }
);

// NOTE:
// This table is intended to have ONLY ONE ROW.
// It stores editable static content for the website.
// Admin APIs will enforce single-record behavior.
// */

export default CMSContent;
