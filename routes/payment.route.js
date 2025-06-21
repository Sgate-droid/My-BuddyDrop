import express from 'express';
import { initiatePayment, verifyPayment } from '../controllers/payment.controller.js';
import { protectedAction } from "../middleware/protected.js";

const router = express.Router();

router.post('/initiate', initiatePayment);
router.get("/verify-payment", protectedAction, verifyPayment);

export default router;
