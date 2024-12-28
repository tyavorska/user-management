import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Welcome: React.FC = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const firstName = localStorage.getItem('first_name') || 'User';

  const handleLogout = () => {
    setToken(null);
    navigate('/signin');
  };

  return (
    <div>
      <h1>Hello {firstName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;
