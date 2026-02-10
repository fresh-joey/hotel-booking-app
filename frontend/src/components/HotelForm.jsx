import React, { useState } from "react";
import { API_URLS } from "../config/api.js";

export default function HotelForm({ onHotelAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URLS.HOTEL}/hotels`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const newHotel = await res.json();
    onHotelAdded(newHotel);
    setFormData({
      name: "",
      location: "",
      price: "",
      description: "",
      image: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      ></textarea>
      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <button type="submit">Add Hotel</button>
    </form>
  );
}
