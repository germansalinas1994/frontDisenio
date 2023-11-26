
import 'animate.css'

import AppRouter from './router/AppRouter';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import es from 'dayjs/locale/es';
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';




function App() {

  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect, isLoading]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={es} >
      <AppRouter/>  
    </LocalizationProvider>

  )
}

export default App
