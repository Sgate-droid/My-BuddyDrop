import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Pet = sequelize.define(
  "Pet",
  {
    Name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    breed: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: true },
    fileName: { type: DataTypes.STRING, allowNull: true },
  },
  { timestamps: true }
);

export default Pet;