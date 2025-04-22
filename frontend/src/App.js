import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QRGenerator from './pages/qrgenerator';
import HomePage from './pages/home';
import QRValidator from './pages/qrvalidator';
import AdminPage from './pages/admin';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/qr-generator" element={<QRGenerator />} />
        <Route path="/qr-validator/:id" element={<QRValidator />}/>
      </Routes>
  );
};

export default App;
