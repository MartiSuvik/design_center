import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sustainability from './pages/Sustainability';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sustainability" element={<Sustainability />} />
      </Routes>
    </Router>
  );
}

export default App;