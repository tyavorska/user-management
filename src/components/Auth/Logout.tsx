import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Logout: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/signin');
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
