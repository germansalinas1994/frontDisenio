import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Box} from "@mui/material";
import { Link } from "react-router-dom";
import pid from "../../../../public/images/pid.jpg"
import styled from "@mui/material/styles/styled"
import { shadows } from '@mui/system';


const imagesArray = [
    '../../public/images/pid.jpg',
    '../../public/images/pid2.jpg',
    '../../public/images/pid3.jpg',
    '../../public/images/pid4.jpg',
  ];

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


    // Función para obtener un array aleatorio de imágenes sin repetició
    const getRandomImages = () => {
        const shuffledImages = [...imagesArray].sort(() => Math.random() - 0.5);
        return shuffledImages.slice(0, pids.length); // Obtener tantas imágenes como PIDs
    };
    
    const pidImages = getRandomImages();

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
            {lastThreePids.map((p, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.idPid} mb={5}>
            <StyledCard>
                <Card>
                    <CardActionArea>
                    {/* Mostrar imagen aleatoria en la CardMedia */}
                    <CardMedia
                        sx={{ width: '500px' }}
                        component="img"
                        height="160"
                        width={'100%'}
                        src={pidImages[index]} // Asignar una imagen diferente a cada PID
                        alt="imagen aleatoria"
                    />
                    <StyledCardContent>
                        <CardContent>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {p.denominacion}
                            </Typography>
                            <Typography  color="textSecondary" sx={{ fontSize: '1.0rem' }}>
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
