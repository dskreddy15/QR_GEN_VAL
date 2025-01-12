import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to QR App</h1>
      <div style={{ marginTop: '20px' }}>
        <Link to="/qr-generator">
          <button style={{ margin: '10px', padding: '10px 20px' }}>QR Generator</button>
        </Link>
        <Link to="/qr-scanner">
          <button style={{ margin: '10px', padding: '10px 20px' }}>QR Scanner</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;