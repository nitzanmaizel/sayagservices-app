import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { SnackbarProvider } from './context/SnackbarContext.tsx';
import { ProductProvider } from './context/ProductContext.tsx';
import { UserProvider } from './context/UserContext';
import { DocsProvider } from './context/DocsContext';
import App from './App.tsx';
import theme from './theme.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <SnackbarProvider>
        <UserProvider>
          <DocsProvider>
            <ProductProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </ProductProvider>
          </DocsProvider>
        </UserProvider>
      </SnackbarProvider>
    </Router>
  </StrictMode>
);
