/**
 * App Component
 *
 * The `App` component is the root component of the application. It sets up routing, theme management, and layout for the entire app. The component includes:
 * - A `ThemeProvider` to apply either the light or dark theme based on the `darkMode` state.
 * - A `NavBar` component that allows users to toggle the theme.
 * - A `Routes` component to manage navigation between different views: `CharacterList`, `EpisodeList`, `LocationList`, and `CharacterDetail`.
 *
 * State Management:
 * - `darkMode` (boolean): Determines whether the application is in dark mode or light mode.
 *
 * Methods:
 * - `handleThemeChange`: Toggles the `darkMode` state between true and false.
 *
 * @component
 *
 * @returns {React.ReactElement} The rendered `App` component with routing and theme functionality.
 *
 * @example
 * // Usage of the App component:
 * // Import and render the `App` component as the main entry point in your React application.
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 * import App from './App';
 *
 * const rootElement = document.getElementById('root');
 * ReactDOM.render(<App />, rootElement);
 */
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import CharacterList from './components/character/CharacterList';
import { Box, Container } from '@mui/material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './utils/theme/index';
import EpisodeList from './components/episode/EpisodeList';
import LocationList from './components/location/LocationList';
import CharacterDetail from './components/character/CharacterDetail';

const App: React.FC = () => {

  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <NavBar darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Box sx={{ mt: 8 }}>
        <Container>
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/character" element={<CharacterList />} />
            <Route path="/episode" element={<EpisodeList />} />
            <Route path="/location" element={<LocationList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;