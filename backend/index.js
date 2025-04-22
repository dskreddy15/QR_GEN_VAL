import express from 'express';
const app = express();
app.use(express.json());
import cors from 'cors';
app.use(cors());

import {Low} from 'lowdb';
import { JSONFile, JSONFilePreset } from 'lowdb/node';

const db = await JSONFilePreset('db.json', {  coupons: [] 
                            }); 
// Generate QR Endpoint
app.post('/api/generate-qr', async (req, res) => {
  const { couponCode, addDiscount, validFrom, validTo } = req.body;

  try {
    await db.read();
    const coupons = db.data.coupons;

    const couponExists = coupons.some(coupon => coupon.couponCode === couponCode);
    if (couponExists) {
      return res.status(200).json({ message: 'QR already exists' });
    }
      else {
        const newCoupon = {
          couponCode,
          isValid: false,
          redeemed: false,
          createdAt: new Date().toISOString(),
          addDiscount,
          validFrom,
          validTo,
    };

    db.data.coupons.push(newCoupon);
    await db.write();
    res.status(201).json(newCoupon);
    }} catch (error) {
  res.status(500).json({ message: 'Error generating QR', error });
  }
});


app.post(`/api/validate-qr`, async (req, res) => {
    await db.read();
    const { couponCode } = req.body;

    if (!couponCode) {
      return res.status(400).json({ message: 'Coupon code is required' });
    }

    const coupon = db.data.coupons.find(coupon => coupon.couponCode === couponCode);

    const validTo = new Date(coupon.validTo);
    const now = new Date();

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.json({ message: coupon.isValid ? 'Coupon is valid' : 'Coupon is not valid',
       status: coupon.redeemed ? 'Used' : (now >= validTo ? 'Expired' : "Valid")
     });
    
    db.write(coupon.isValid = true);

  });


app.post('/api/redeem-qr', async (req, res) => {
  await db.read();
  const { couponCode } = req.body;
  if (!couponCode) {
    return res.status(400).json({ message: 'Coupon code is required' });
  }
  const coupon = db.data.coupons.find(coupon => coupon.couponCode === couponCode);
  //console.log(Date(coupon.validFrom));
  //console.log(new Date());
  const validFrom = new Date(coupon.validFrom);
  const now = new Date();
  if ( validFrom > now) {
    return res.json({ message: "Coupon is Redeemable from " + coupon.validFrom, addDiscount: coupon.addDiscount });
  }
  else{
  res.json({ message: coupon ? (coupon.redeemed ? 'Coupon already redeemed' : 'Coupon redeemed successfully') : 'Coupon not found'
     , addDiscount: coupon ? coupon.addDiscount : 0});
   db.write(coupon.redeemed = true);
  }
   });

   // Start Server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
