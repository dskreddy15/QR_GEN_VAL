// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const QRCode = require('qrcode');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://mongoID:cluster_password@cluster0.h0wkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Coupon Schema
const couponSchema = new mongoose.Schema({
  couponCode: { type: String, required: true, unique: true },
  qrGenerated: { type: Boolean, default: false },
  redeemed: { type: Boolean, default: false },
});

const Coupon = mongoose.model('Coupon', couponSchema);

// Generate QR Endpoint
app.post('/api/generate-qr', async (req, res) => {
  const { couponCode } = req.body;

  try {
    let coupon = await Coupon.findOne({ couponCode });

    if (coupon) {
      if (coupon.qrGenerated) {
        return res.status(200).json({ message: 'QR already exists' });
      }
    } else {
      coupon = new Coupon({ couponCode });
    }

    // Generate QR Code
    const qrImage = await QRCode.toDataURL(couponCode);

    coupon.qrGenerated = true;
    await coupon.save();

    res.status(200).json({ message: 'QR generated', qrImage });
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR', error });
  }
});


// Scan QR Endpoint
// Validate QR Endpoint
app.post('/api/validate-qr', async (req, res) => {
    const { qrData } = req.body;
  
    try {
      // Check if the QR code exists in the database
      const coupon = await Coupon.findOne({ couponCode: qrData });
  
      if (!coupon) {
        return res.status(404).json({ message: 'QR not matched' });
      }
  
      if (coupon.redeemed) {
        return res.status(200).json({ message: 'QR already used' });
      }
  
      // Mark as redeemed
      coupon.redeemed = true;
      await coupon.save();
  
      res.status(200).json({ message: 'QR is valid. Offer redeemed.' });
    } catch (error) {
      res.status(500).json({ message: 'Error validating QR code', error });
    }
  });
  
  
// Start Server
const PORT = 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
