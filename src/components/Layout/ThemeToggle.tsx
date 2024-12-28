import React from 'react';
import { IconButton } from '@mui/material';
import { WbSunny, NightlightRound } from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
      color="inherit"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <NightlightRound fontSize="large" />
      ) : (
        <WbSunny fontSize="large" />
      )}
    </IconButton>
  );
};

export default ThemeToggle;
