import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Payment = sequelize.define("Payment", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  txRef: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "KES",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
  },
  flwRef: {
    type: DataTypes.STRING,
  }
});

export default Payment;
