import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const EventLog = sequelize.define("EventLog", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  eventType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

export default EventLog;
