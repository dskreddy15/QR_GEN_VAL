import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

const QRScanner = () => {
  const [message, setMessage] = useState('');
  let scannerInstance = null; // Prevent multiple instances

  useEffect(() => {
    scannerInstance = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } }
    );

    scannerInstance.render(
      async (decodedText) => {
        try {
          const response = await axios.post('http://localhost:4001/api/validate-qr', { qrData: decodedText });
          setMessage(response.data.message);
        } catch (error) {
          setMessage(error.response?.data?.message || 'Error validating QR code');
        } finally {
          scannerInstance.clear(); // Stop scanner after successful scan
        }
      },
      (error) => {
        console.warn(`QR Code Scan Error: ${error}`);
      }
    );

    return () => {
      if (scannerInstance) {
        scannerInstance.clear().catch((err) => {
          console.warn("Error clearing scanner:", err);
        });
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>QR Scanner</h1>
      <div id="qr-reader" style={{ width: "300px", margin: "auto" }}></div>
      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
};

export default QRScanner;
