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