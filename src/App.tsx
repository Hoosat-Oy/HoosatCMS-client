import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Admin } from './Routes/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/hoosatcms" element={<Admin />} />
        <Route path="/hoosatcms/:page" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
