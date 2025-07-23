import React, { useState } from 'react';
import HotelSearchForm from '../components/HotelSearchForm.jsx';
import HotelCard from '../components/HotelCard.jsx';

export default function HotelSearchPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`http://localhost:4001/hotels?${query}`);
    const data = await res.json();
    setHotels(data);
    setLoading(false);
  };

  return (
    <div className="hotel-search">
      <h2>Find Your Perfect Stay</h2>
      <HotelSearchForm onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : (
        <div className="hotel-grid">
          {hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}