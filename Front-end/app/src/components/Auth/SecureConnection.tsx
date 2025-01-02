import React from 'react';
import './SecureConnection.css'
const SecureConnection = () => {
  return (
    <p className="mt-3 text-100 text-white tracking-wider">
      Establishing secure connection
      <span className="jumping-dots">
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </span>
    </p>
  );
};

export default SecureConnection;