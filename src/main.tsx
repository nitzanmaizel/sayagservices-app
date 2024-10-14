import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { SnackbarProvider } from './context/SnackbarContext.tsx';
import { UserProvider } from './context/UserContext';
import { DocsProvider } from './context/DocsContext';
import App from './App.tsx';
import theme from './theme.tsx';
import './index.css';

const queryClient = new QueryClient();

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <UserProvider>
            <DocsProvider>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <App />
                  <ReactQueryDevtools initialIsOpen={false} />
                </ThemeProvider>
              </CacheProvider>
            </DocsProvider>
          </UserProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
