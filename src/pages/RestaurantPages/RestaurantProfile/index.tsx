import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantProfile = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: '500',
        }}
      >
        RestaurantProfile
      </div>
      <div
        style={{
          borderTop: '1px solid #e0e0e0',
          marginTop: '1rem',
          paddingTop: '1rem',
        }}
      ></div>
      <button
        style={{
          backgroundColor: 'black',
          border: 'none',
          borderRadius: '10px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          marginTop: '1rem',
        }}
        onClick={() => {
            navigate('/integrations');
        }}
      >
        Setup Intigration
      </button>
    </div>
  );
};

export default RestaurantProfile;
