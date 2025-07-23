import React from 'react';

export default function BookingConfirmation({ booking }) {
  return (
    <div className="booking-confirmation">
      <h4>✅ Booking Confirmed</h4>
      <p><strong>Hotel ID:</strong> {booking.hotelId}</p>
      <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
      <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
      <p><strong>Room ID:</strong> {booking.roomId}</p>
    </div>
  );
}