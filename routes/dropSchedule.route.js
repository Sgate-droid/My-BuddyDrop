// routes/DropSchedule.routes.js
import express from 'express';
import { createDropSchedule, getUserDropSchedules } from '../controllers/dropSchedule.controller.js';
import { protectedAction } from '../middleware/protected.js';

const router = express.Router();

router.post('/', protectedAction, createDropSchedule);
router.get('/', protectedAction, getUserDropSchedules);

export default router;
