// models/DropSchedule.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

const DropSchedule = sequelize.define("DropSchedule", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dropLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dropDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dropTime: {
    type: DataTypes.STRING,
    allowNull: false // e.g. "09:00 - 12:00"
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

export default DropSchedule;
