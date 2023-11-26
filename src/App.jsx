
import 'animate.css'

import AppRouter from './router/AppRouter';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import es from 'dayjs/locale/es';




function App() {



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={es} >
      <AppRouter/>  
    </LocalizationProvider>

  )
}

export default App
