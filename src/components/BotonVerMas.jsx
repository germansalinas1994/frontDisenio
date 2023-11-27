import { Button } from "@mui/material";
import PlusIcon from '@mui/icons-material/Add';

const BotonVermas = ({ onClick }) => {
    return(
        <Button onClick={onClick}
        variant="contained"
        color="primary"
        sx={{
            borderRadius: '10px',
            float: { xs: 'none', md: 'right' },  // Agrega float a la derecha en pantallas medianas y grandes, elimina en pantallas pequeñas
            marginTop:'5px',
            // marginRight:'100px',
            fontSize: '1.1em',
            //le saco las mayusculas
            textTransform: 'none',
            minWidth: '40px',
            width: '150px',
            height: '40px',
            color: 'white',
        }}
        >
            <PlusIcon />
            Ver mas
        </Button>
    )
}

export default BotonVermas;