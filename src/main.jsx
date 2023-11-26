import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter} from "react-router-dom";
import Layout from './layout/Layout.jsx';
import { Auth0Provider } from '@auth0/auth0-react';




import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
          domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
          redirectUri={window.location.origin}
        >
          <BrowserRouter>
            <Layout>
              <App/>
            </Layout>
          </BrowserRouter>
    </Auth0Provider>

  </React.StrictMode>,
)
