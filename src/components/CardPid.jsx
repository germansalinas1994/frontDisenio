import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Box} from "@mui/material";
import { Link } from "react-router-dom";
import pid from "../../public/images/pid.jpg"
import styled from "@mui/material/styles/styled"
import { shadows } from '@mui/system';


const StyledCard = styled(Card)(({ theme }) => ({
    marginLeft: '120px',
    marginTop: '20px',
    // justifyContent: 'center',
    width: '350px',
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', // Sombra de la tarjeta
    borderRadius: 5,
    border: '2px solid black',
    display: 'flex',
    // flexDirection: 'column',
    '&:hover': { boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }
  }));
  
  const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-start',
    height: '200px', // Altura fija para el contenido de la tarjeta
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: theme.spacing(2), // Ajusta el padding según tus preferencias
    textAlign: 'left'
}));


const CardPid = ({ pids }) => {



    // Invertir el orden de los PIDs para mostrar los últimos cargados primero
    const reversedPids = [...pids].reverse()

    //Aca creo una variable para que en la pagina HOME se muestren solo los ultimos 3 pids cargados
    const lastThreePids = reversedPids.slice(0, 3);

    if (pids.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh", // Asegura que ocupe toda la altura de la pantalla
                    width: "100%", // Asegura que ocupe todo el ancho de la pantalla
                }}
            >
                <Typography variant="h4" component="h2" sx={{ 
                    fontWeight: 'bold',
                    fontSize: '2rem', // Tamaño más grande para el texto
                    textAlign: 'center', // Centrar el texto
                    color: '#333', // Puedes cambiar el color si lo deseas
                    // justifyContent: 'center'
                    marginLeft:'200px',
                    marginTop:'60px'
                }}>
                    No se ha agregado ningún PID
                </Typography>
                <Typography variant="h7" sx={
                    {
                        // fontWeight: '',
                        fontSize: '1.5rem', // Tamaño más grande para el texto
                        textAlign: 'center', // Centrar el texto
                        color: '#333', // Puedes cambiar el color si lo deseas
                        // justifyContent: 'center'
                        marginLeft:'200px',
                        // marginTop:'60px'
                    }
                }>
                    Debe agregar al menos uno.
                </Typography>
            </Box>
        );
    }


    return (
        <>
            {lastThreePids.map((p) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.idPid} mb={5}>
            <StyledCard>
                <Card>
                    <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                    <CardMedia component="img" height="160" src={pid} alt="ejemplo" />
                    <StyledCardContent>
                        <CardContent>
                            <Typography variant="h5" align="left" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left' }}>
                            {p.denominacion}
                            </Typography>
                            <Typography align="left" color="textSecondary" sx={{ fontSize: '1.0rem', textAlign: 'left' }}>
                            {p.universidad.nombre}
                            </Typography>
                        </CardContent>
                    </StyledCardContent>
                    </CardActionArea>
                </Card>
            </StyledCard>
            </Grid>
            ))}
        </>
    )
}

export default CardPid;
