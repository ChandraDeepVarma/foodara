import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AdminActivityLog = sequelize.define(
  "AdminActivityLog",
  {
    browser: {
      type: DataTypes.STRING,
    },

    os: {
      type: DataTypes.STRING,
    },

    ipAddress: {
      type: DataTypes.STRING,
    },

    loginTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    logoutTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "admin_activity_logs",
    timestamps: false,
  }
);

export default AdminActivityLog;
