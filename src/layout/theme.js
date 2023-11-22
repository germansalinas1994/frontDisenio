import { createTheme } from '@mui/material';

const theme = createTheme({

  fontFamily:'roboto', 
  palette: {
    background: {
      default: '#F5F5F5',
      paper: '#41B5AF',
    },
    text: {
      primary: '#121214',
      secondary: '#696969',
      disabled: '#C7D2D2',
    },

    primary: {
     // Cambia estos valores según tus preferencias
      main: '#41B5AF',
      light: '#B4EAE9',
      dark: '#02443E',
      contrastText: '#000000',
    },
    secondary: {
      main: '#6200EE',
      light: '#8C43FF',
      dark: '#4600B5',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
      light: '#DB5858',
      dark: '#932020',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ED6C02',
      light: '#FF9800',
      dark: '#E65100',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0288D1',
      light: '#349FDA',
      dark: '#015F92',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },
    // divider: '#141313',

    
    
    // ... otros colores y opciones
  },
  // ... otras opciones del tema
});



export default theme;