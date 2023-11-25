
import 'animate.css'

import AppRouter from './router/AppRouter';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


// import './css/App.css'

function App() {



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRouter />
    </LocalizationProvider>

  )
}

export default App
