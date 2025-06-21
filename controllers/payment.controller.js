import Payment from "../models/payment.model.js";
import { logEvent } from "../utils/logger.js";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const initiatePayment = async (req, res) => {
  try {
    const { amount, email, name, phone } = req.body;
     const txRef = `TX-${Date.now()}`;

    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      {
        tx_ref: `TX-${Date.now()}`,
        amount,
        currency: 'KES',
        redirect_url: 'http://localhost:3000/api/payments/verify-payments',
        payment_options: 'card,mpesa,ussd',
        customer: {
          email,
          phonenumber: phone,
          name
        },
        customizations: {
          title: 'My Buddy Drop Payment',
          description: 'Payment for pet care service',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

     // Return both the Flutterwave link and the txRef
    res.status(200).json({
      message: "Hosted Link",
      link: response.data.data.link,
      tx_ref: txRef,
    });

  } catch (error) {
    res.status(500).json({ message: 'Payment initiation failed', error: error.message });
  }
};





export const verifyPayment = async (req, res) => {
  try {
    const { tx_ref } = req.query;

    const verifyUrl = `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`;
    const response = await axios.get(verifyUrl, {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
      },
    });

    const data = response.data?.data;

    // Prevent duplicate entries
    const existing = await Payment.findOne({ where: { txRef: data.tx_ref } });
    if (existing) {
      return res.status(200).json({ message: "Payment already recorded", data: existing });
    }

    const payment = await Payment.create({
      userId: req.user?.id || 1,
      txRef: data.tx_ref,
      flwRef: data.flw_ref,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      paymentMethod: data.payment_type,
    });

    // Log the event
    await logEvent({
      userId: payment.userId,
      eventType: "PAYMENT_SUCCESS",
      description: `User completed payment of KES ${payment.amount}`,
      metadata: payment
    });

    res.status(200).json({
      message: "Payment verified and saved",
      data: payment,
    });

  } catch (error) {
    console.error("Verify error:", error.message);
    res.status(500).json({ message: "Payment verification failed", error: error.message });
  }
};