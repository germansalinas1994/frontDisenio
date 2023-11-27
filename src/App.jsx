
import 'animate.css'

import AppRouter from './router/AppRouter';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import es from 'dayjs/locale/es';
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingModal from './components/LoadingModal';
import { is } from 'date-fns/locale';



function App() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const { showLoadingModal, hideLoadingModal } = LoadingModal();

  useEffect(() => {
    if (isLoading) {
      showLoadingModal();
    } else {
      hideLoadingModal();
      if (!isAuthenticated) {
        loginWithRedirect();
      }
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, showLoadingModal, hideLoadingModal]);


  if(isAuthenticated){
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={es}>
        <AppRouter />
      </LocalizationProvider>
    );
  
  }

}

export default App;