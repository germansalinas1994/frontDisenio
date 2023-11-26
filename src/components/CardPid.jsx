import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Box} from "@mui/material";
import { Link } from "react-router-dom";
import pid from "../../public/images/pid.jpg"
import styled from "@mui/material/styles/styled"


const StyledCard = styled(Card)(({ theme }) => ({
    margin: '10px',
    width: '100%',
    cursor: 'pointer',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
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


    if (pids.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se han agregado PIDs</Typography>
            </Box>
        );
    }

    // Invertir el orden de los PIDs para mostrar los últimos cargados primero
    const reversedPids = [...pids].reverse()

    //Aca creo una variable para que en la pagina HOME se muestren solo los ultimos 3 pids cargados
    const lastThreePids = reversedPids.slice(0, 3);

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
