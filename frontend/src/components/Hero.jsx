import React from 'react';
import LoginButtons from './LoginButtons.jsx';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find Your Perfect Stay</h1>
        <p>Book hotels in the most beautiful destinations with ease. Trusted by millions of travelers.</p>
        <LoginButtons />
      </div>
    </section>
  );
}