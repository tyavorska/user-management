import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { loginUser } from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';

const SignIn: React.FC = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      setToken(data.token);
      navigate('/welcome');
    } catch (err) {
      setError('Something went wrong');
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
        Sign In
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
          Sign In
        </Button>
      </form>
      <Typography sx={{ mt: 2, color: 'text.secondary' }}>
        Don't have an account?{' '}
        <Link
          href="#"
          onClick={() => navigate('/signup')}
          sx={{ color: 'primary.main' }}
        >
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default SignIn;
