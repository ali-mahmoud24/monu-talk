import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';

import AuthContextProvider from './shared/context/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
