// import express from "express";
// import { createRecord, getPetRecords } from "../controllers/medicalDietRecord.controller.js";
// import { protectedAction } from "../middleware/protected.js";
// import upload from "../middleware/upload.middleware.js";

// const router = express.Router();

// router.post("/", protectedAction, upload.single("file"), createRecord);
// router.post("/", protectedAction, createRecord);
// router.get("/:petId", protectedAction, getPetRecords);

// export default router;





import express from "express";
import { createRecord, getPetRecords } from "../controllers/medicalDietRecord.controller.js";
import { protectedAction } from "../middleware/protected.js";
import upload from "../middleware/upload.middleware.js";
const router = express.Router();
// Correct: Single POST route with upload middleware
router.post("/", protectedAction, upload.single("file"), createRecord);
// GET route remains unchanged
router.get("/:petId", protectedAction, getPetRecords);
export default router;