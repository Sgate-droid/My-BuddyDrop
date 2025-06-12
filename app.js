import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import petRoutes from "./routes/pet.route.js";
import { sequelize } from "./config/db.config.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port: ", PORT);
    });
  })
  .catch((err) => {
    console.log("Error syncing database: ", err);
  });
