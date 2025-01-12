import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QRGenerator from './pages/qrgenerator';
import HomePage from './pages/home';
import QRScanner from './pages/qrvalidator';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qr-generator" element={<QRGenerator />} />
        <Route path="/qr-scanner" element={<QRScanner/>}/>
      </Routes>
  );
};

export default App;
