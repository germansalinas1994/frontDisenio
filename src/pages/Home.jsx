import { Card, Grid , Typography , Box} from '@mui/material';
import LoadingModal from '../components/LoadingModal';
import { useState, useEffect,useContext} from 'react';
import axios from 'axios';
import CardPid from '../components/Pid/Home/CardPid';
import GenericCard from '../components/Pid/Home/GenericCard';
import BotonVerMas from '../components/BotonVerMas';
import { Link } from 'react-router-dom';

const Home = () => {

    const apiLocalKey = import.meta.env.VITE_APP_API_KEY
    const [pids, setPids] = useState([]);
    //codigo para mostrar u ocultar el modal de carga
    const { showLoadingModal, hideLoadingModal, isLoading } = LoadingModal();

    const noPids =  pids.length == 0; //Variable para indicar si no hay ningun pid

    useEffect(()  => {
        //Logica para obtener los pids
        const fetchPids = async () => { 
            showLoadingModal();

            try {
                const response = await axios.get(apiLocalKey + '/ultimosPids');
                setPids (response.data.result.data)
                if(!isLoading){
                    hideLoadingModal();
                }
            } catch (error){
                hideLoadingModal();
                console.log(error);
            }

        };
        fetchPids();
    }, []);


    if (isLoading) {
        return null
    }
    
    return (
        <Box sx={{ display: 'relative', flexDirection: 'column', height: '100vh' }}>
            {!noPids && ( //Mientras haya al menos 1 PID cargado, se muestra el boton, de lo contrario, desaparece
                <Link to='/pid'> 
                    <BotonVerMas/>
                </Link>
            )}
            <Typography variant="h3" sx={{ marginBottom: 2 , fontWeight:'300', marginLeft:'10px', fontFamily:'roboto', fontSize:'40px' }}>
                Proyectos Recientes
            </Typography>     
            <GenericCard>
                <Grid  container spacing={30} sx={{backgroundColor:'secondary'}}>
                    <CardPid pids={pids} />
                </Grid>
            </GenericCard>
        </Box>
    )
}

export default Home;
