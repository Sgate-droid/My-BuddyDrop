import express from "express";
import {
  createPetProfile,
  getAllPetsProfile,
  getPetProfile,
  updatePetProfile,
  deletePetProfile,
} from "../controllers/pet.controller.js";
import { createPetProfileValidator, validationResultMiddleware } from "../middleware/validator.js";
import { protectedAction } from "../middleware/protected.js";
import { upload } from "../config/storage.config.js";

const router = express.Router();

router.post("/upload", upload.single('file'), createPetProfileValidator, validationResultMiddleware, createPetProfile);

router.get("/", getAllPetsProfile);

router.get("/:id", getPetProfile);

router.put("/:id", updatePetProfile);

router.delete("/:id", protectedAction, deletePetProfile);

export default router;