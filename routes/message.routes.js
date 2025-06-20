import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import { protectedAction } from "../middleware/protected.js";

const router = express.Router();

router.post('/', protectedAction, sendMessage);
router.get('/:userId', protectedAction, getMessages);

export default router;
