import React, { useState } from 'react';
import axios from 'axios';

const QRGenerator = () => {
  const [couponCode, setCouponCode] = useState('');
  const [qrImage, setQrImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleGenerateQR = async () => {
    if (!couponCode) {
      setMessage('Please enter a coupon code');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4001/api/generate-qr', { couponCode });
      setQrImage(response.data.qrImage);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error generating QR code');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Generator</h1>
      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter Coupon Code"
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={handleGenerateQR} style={{ margin: '10px', padding: '10px 20px' }}>
        Generate QR
      </button>
      {message && <p>{message}</p>}
      {qrImage && (
        <div>
          <img src={qrImage} alt="QR Code" style={{ marginTop: '20px' }} />
          <a href={qrImage} download="qr-code.png">
            <button style={{ marginTop: '10px', padding: '10px 20px' }}>Download QR</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
