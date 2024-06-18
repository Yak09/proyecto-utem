import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2DD69C',
    },
    secondary: {
      main: '#031A8E',
    },
    background: {
      default: '#f5f5f5', // Color de fondo de la aplicación
    },
  },
});

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

if (!domain || !clientId) {
  console.error('Faltan variables de entorno de Auth0');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: theme.palette.background.default },
            html: { backgroundColor: theme.palette.background.default },
          }}
        />
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
