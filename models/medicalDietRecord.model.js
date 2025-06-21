import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const MedicalDietRecord = sequelize.define("MedicalDietRecord", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("medical", "diet"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default MedicalDietRecord;
