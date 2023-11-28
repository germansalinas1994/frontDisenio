import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from "react-router-dom";
import Layout from './layout/Layout.jsx';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import { CssBaseline } from '@mui/material';

const AuthenticatedApp = () => {
  return (
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  );
};

const Root = () => {
  const { isAuthenticated, loginWithRedirect, isLoading, user } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!isAuthenticated && !isLoading) {
        await loginWithRedirect();
      } else {
        setLoading(false);
      }
    };

    handleAuthentication();
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (loading) {
    // Muestra un indicador de carga mientras se verifica la autenticación
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Si no está autenticado y no se está cargando, redirige a la pantalla de inicio de sesión
    return null; // o puedes mostrar un mensaje de error u otra cosa
  }

  // Si el usuario está autenticado, muestra la aplicación principal
  return (
    <React.StrictMode>
      <CssBaseline />
      <AuthenticatedApp />
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <Root />
  </Auth0Provider>,
  document.getElementById('root')
);
