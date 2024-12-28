import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/api';

const SignUp: React.FC = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const data = await registerUser({ email, password });
      if (data.token) {
        setToken(data.token);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 4,
        padding: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom color="text.primary">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          color="primary"
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: 'background.default',
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          color="primary"
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: 'background.default',
            },
          }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          color="primary"
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: 'background.default',
            },
          }}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            padding: '10px',
            fontWeight: 600,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Sign Up
        </Button>
      </form>
      <Typography sx={{ mt: 2, color: 'text.secondary' }}>
        Already have an account?{' '}
        <Link
          href="#"
          onClick={() => navigate('/signin')}
          sx={{ color: 'primary.main' }}
        >
          Sign In
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUp;
