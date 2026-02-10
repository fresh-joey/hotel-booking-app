// API Base URLs
export const API_URLS = {
  AUTH: import.meta.env.VITE_API_AUTH_URL || "http://localhost:4000",
  HOTEL: import.meta.env.VITE_API_HOTEL_URL || "http://localhost:4001",
  BOOKING: import.meta.env.VITE_API_BOOKING_URL || "http://localhost:4002",
  USER: import.meta.env.VITE_API_USER_URL || "http://localhost:4003",
  REVIEW: import.meta.env.VITE_API_REVIEW_URL || "http://localhost:4004",
};

export default API_URLS;
