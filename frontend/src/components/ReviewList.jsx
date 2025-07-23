import React from 'react';

export default function ReviewList({ reviews }) {
  if (!reviews.length) return <p>No reviews yet.</p>;
  return (
    <div className="review-list">
      {reviews.map(review => (
        <div key={review.id} className="review-card">
          <p><strong>User:</strong> {review.userId}</p>
          <p><strong>Rating:</strong> {'⭐'.repeat(review.rating)}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}