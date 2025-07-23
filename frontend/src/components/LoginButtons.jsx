import React from 'react';

export default function LoginButtons() {
  return (
    <div className="login-buttons">
      <a href="/auth/google" className="btn btn-google">Login with Google</a>
      <a href="/auth/facebook" className="btn btn-facebook">Login with Facebook</a>
    </div>
  );
}