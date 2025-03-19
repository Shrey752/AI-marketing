import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Import components
import Navigation from './components/Navigation';

// Import pages
import Dashboard from './pages/Dashboard';
import InstagramGenerator from './pages/InstagramGenerator';
import WhatsAppAutomation from './pages/WhatsAppAutomation';
import LeadManagement from './pages/LeadManagement';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/instagram" element={<InstagramGenerator />} />
              <Route path="/whatsapp" element={<WhatsAppAutomation />} />
              <Route path="/leads" element={<LeadManagement />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 