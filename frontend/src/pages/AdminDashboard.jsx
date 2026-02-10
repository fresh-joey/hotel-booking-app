import React, { useEffect, useState } from "react";
import AdminBookingList from "../components/AdminBookingList.jsx";
import { API_URLS } from "../config/api.js";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch(`${API_URLS.BOOKING}/bookings`);
      const data = await res.json();
      setBookings(data);
    };
    fetchBookings();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <h3>Recent Bookings</h3>
      <AdminBookingList bookings={bookings} />
    </div>
  );
}
