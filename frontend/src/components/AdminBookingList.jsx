import React from 'react';

export default function AdminBookingList({ bookings }) {
  return (
    <table className="booking-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Hotel ID</th>
          <th>Check-in</th>
          <th>Check-out</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(booking => (
          <tr key={booking.id}>
            <td>{booking.userId}</td>
            <td>{booking.hotelId}</td>
            <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
            <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
            <td>
              <select defaultValue={booking.status}>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}