import React, { useState } from 'react';

export default function HotelSearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 1000,
    checkIn: '',
    checkOut: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="hotel-search-form">
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input type="date" name="checkIn" onChange={handleChange} />
      <input type="date" name="checkOut" onChange={handleChange} />
      <input type="number" name="minPrice" placeholder="Min Price" onChange={handleChange} />
      <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}