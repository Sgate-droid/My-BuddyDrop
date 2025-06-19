import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const initiatePayment = async (req, res) => {
  try {
    const { amount, email, name, phone } = req.body;

    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      {
        tx_ref: `TX-${Date.now()}`,
        amount,
        currency: 'KES',
        redirect_url: 'https://yourapp.com/payment-success',
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

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Payment initiation failed', error: error.message });
  }
};
