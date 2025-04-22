import React, { useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import axios from 'axios';

const QRGenerator = () => {
  const [couponCode, setCouponCode] = useState('');
  const [addDiscount, setAddDiscount] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const [qrImage, setQrImage] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateQR = async () => {
    if (!couponCode && !addDiscount && !validFrom && !validTo) {
      setMessage('Please enter All Details');
      return;
    }

    try {
      const response = await axios.post(' http://192.168.86.23:4000/api/generate-qr', { couponCode, addDiscount, validFrom, validTo });
      const qrImage = new QRCodeStyling({width: 300,
        height: 300,
        type: "svg",
        data: 'http://192.168.86.23:3000/qr-validator/' + response.data.couponCode, // URL to validate the QR code need to give the server IP address instead of loacalhost...
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTduvxuKpNslsT-krIPnzh0VH61SerjD4znlA&s",
        dotsOptions: {
            color: "#B63379",
            type: "dotted"
        },
        backgroundOptions: {
            color: "#ffffff",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 10
        }
    });

    qrImage.append(document.getElementById("canvas"));
    qrImage.download({ name: response.data.couponCode, extension: "svg" });
    setQrImage(qrImage);
    setMessage(response.data.message);
    } catch (error) {
      setMessage('Error generating QR code');
    }
  };

  return (
    <div style={{ display: 'block',textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Generator</h1>
      <div style={{ display: 'block', margin: '5px'}}>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter Coupon Code"
          style={{ padding: '10px', width: '300px' }}
        />
      </div>

      <div style={{ margin: '5px'}}>
        <input
          type = "text"
          value={addDiscount}
          onChange={(e) => setAddDiscount(e.target.value)}
          placeholder="Enter Discount"
          style={{padding: '10px', width: '300px' }}
          />
      </div>

      <div style={{ margin: '5px'}}>
        <label style={{margin: '5px'}}>Valid From</label>
        <input
          type = "date"
          value={validFrom}
          onChange={(e) => setValidFrom(e.target.value)}
          style={{ padding: '10px', width: '300px' }}/>
      </div>
      
      <div style={{ margin: '5px'}}>
        <label style={{margin: '5px'}}>Valid To</label>
        <input
          type = "date"
          placeholder='Valid To'
          value={validTo}
          onChange={(e) => setValidTo(e.target.value)}
          style={{ padding: '10px', width: '300px' }}/>
        <button onClick={handleGenerateQR} style={{ margin: '10px', padding: '10px 20px' }}>
          Generate QR
        </button>
      </div>
      {message && <p>{message}</p>}
      {qrImage && (
        <div style={{ margin: '5px'}}>
          {qrImage && <div ref={(ref) => ref && qrImage.append(ref)} />}
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
