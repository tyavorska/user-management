import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useAuth } from './hooks/useAuth';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import Logout from './components/Auth/Logout';
import ThemeToggle from './components/Layout/ThemeToggle';

const App: React.FC = () => {
  const { token } = useAuth();

  return (
    <>
      {' '}
      <Router>
        {token && (
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                User Management
              </Typography>
              <ThemeToggle />
              <Logout />
            </Toolbar>
          </AppBar>
        )}
        <Routes>
          <Route
            path="/signup"
            element={token ? <Navigate to="/dashboard" /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={token ? <Navigate to="/dashboard" /> : <SignIn />}
          />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/signin" />}
          />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
