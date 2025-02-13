import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/webhook', express.json(), async (req, res) => {
  const secret = process.env.WEBHOOK_SECRET;
  const razorpay_signature = req.headers['x-razorpay-signature'];

  // Compute expected signature
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    console.log("✅ Webhook Verified");

    // Extract payment details
    const payment_id = req.body.payload?.payment?.entity?.id || "N/A";
    const order_id = req.body.payload?.payment?.entity?.order_id || "N/A";
    const amount = req.body.payload?.payment?.entity?.amount / 100 || 0;
    const status = req.body.payload?.payment?.entity?.status || "unknown";
    
    console.log("✅ Payment ID:", payment_id);
    console.log("✅ Order ID:", order_id);
    console.log("✅ Amount:", amount);
    console.log("✅ Status:", status);
    
    if(status === "captured"){
      res.status(200).json({ status: "success", payment_id, order_id });
    }
  } else {
    console.error("❌ Webhook Verification Failed");
    res.status(400).json({ status: "failed", message: "Invalid signature" });
  }
});

export default router;
