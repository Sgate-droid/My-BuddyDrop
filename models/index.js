import { sequelize } from "../config/db.config.js";
import User from "./user.model.js";
import Pet from "./pet.model.js";
import Econtact from "./Econtact.models.js";
import Message from "./message.model.js";


export { sequelize, User, Pet, Econtact, Message};
