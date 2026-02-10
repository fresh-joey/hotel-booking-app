import React, { useEffect, useState } from "react";
import HotelForm from "../components/HotelForm.jsx";
import HotelEditCard from "../components/HotelEditCard.jsx";
import { API_URLS } from "../config/api.js";

export default function AdminHotelManagement() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const res = await fetch(`${API_URLS.HOTEL}/hotels`);
      const data = await res.json();
      setHotels(data);
    };
    fetchHotels();
  }, []);

  const handleHotelAdded = (newHotel) => {
    setHotels([...hotels, newHotel]);
  };

  const handleHotelUpdated = (updatedHotel) => {
    setHotels(hotels.map((h) => (h.id === updatedHotel.id ? updatedHotel : h)));
  };

  const handleHotelDeleted = (id) => {
    setHotels(hotels.filter((h) => h.id !== id));
  };

  return (
    <div className="admin-hotel-management">
      <h2>Manage Hotels</h2>
      <HotelForm onHotelAdded={handleHotelAdded} />
      <div className="hotel-list">
        {hotels.map((hotel) => (
          <HotelEditCard
            key={hotel.id}
            hotel={hotel}
            onHotelUpdated={handleHotelUpdated}
            onHotelDeleted={handleHotelDeleted}
          />
        ))}
      </div>
    </div>
  );
}
