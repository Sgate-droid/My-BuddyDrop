import express from 'express';
import { initiatePayment } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/pay', initiatePayment);

export default router;
