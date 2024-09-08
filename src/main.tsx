import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { UserProvider } from './context/UserContext';
import { DocsProvider } from './context/DocsContext';
import App from './App.tsx';
import theme from './theme.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <UserProvider>
          <DocsProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </DocsProvider>
        </UserProvider>
      </Router>
    </GoogleOAuthProvider>
  </StrictMode>
);
