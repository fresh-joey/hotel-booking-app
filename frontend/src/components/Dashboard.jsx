import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('http://localhost:4003/users/me');
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <div className="dashboard">
      {user ? (
        <>
          <section className="user-info">
            <h3>Welcome, {user.name}</h3>
            <p>Here are your recent bookings:</p>
          </section>
          <p>Your bookings will appear here</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}