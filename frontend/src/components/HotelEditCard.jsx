import React, { useState } from 'react';

export default function HotelEditCard({ hotel, onHotelUpdated, onHotelDeleted }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(hotel);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:4001/hotels/${hotel.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const updatedHotel = await res.json();
    onHotelUpdated(updatedHotel);
    setEditing(false);
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:4001/hotels/${hotel.id}`, {
      method: 'DELETE'
    });
    onHotelDeleted(hotel.id);
  };

  return (
    <div className="hotel-edit-card">
      {editing ? (
        <>
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="location" value={formData.location} onChange={handleChange} />
          <input name="price" value={formData.price} onChange={handleChange} />
          <textarea name="description" value={formData.description} onChange={handleChange} />
          <input name="image" value={formData.image} onChange={handleChange} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{hotel.name}</h3>
          <p>{hotel.location}</p>
          <p>${hotel.price}/night</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}