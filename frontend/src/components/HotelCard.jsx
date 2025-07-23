import React from 'react';

export default function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      {hotel.image && <img src={hotel.image} alt={hotel.name} className="hotel-image" />}
      <h3>{hotel.name}</h3>
      <p><strong>Location:</strong> {hotel.location}</p>
      <p><strong>Price:</strong> ${hotel.price}/night</p>
      <p>{hotel.description}</p>
    </div>
  );
}