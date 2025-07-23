import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminHotelManagement from './pages/AdminHotelManagement.jsx';
import HotelSearchPage from './pages/HotelSearchPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/hotels" element={<AdminHotelManagement />} />
        <Route path="/search" element={<HotelSearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;