import { Card, Grid , Typography , Box} from '@mui/material';
import LoadingModal from '../components/LoadingModal';
import { useState, useEffect,useContext} from 'react';
import axios from 'axios';
import CardPid from '../components/CardPid';


const Home = () => {

    const apiLocalKey = import.meta.env.VITE_APP_API_KEY
    const [pids, setPids] = useState([]);
    //codigo para mostrar u ocultar el modal de carga
    const { showLoadingModal, hideLoadingModal, isLoading } = LoadingModal();


    useEffect(()  => {
        //Logica para obtener los pids
        const fetchPids = async () => { 
            showLoadingModal();

            try {
                const response = await axios.get(apiLocalKey + '/pid');
                setPids (response.data.result.data)
                hideLoadingModal();
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
        <Box sx={{ display: 'relative', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h3" sx={{ marginBottom: 2 , fontWeight:'300', marginLeft:'10px', fontFamily:'roboto', fontSize:'40px' }}>
                PROYECTOS RECIENTES
            </Typography>
            <Grid container spacing={2} justifyContent="left" sx={{display:'flex', maxWidth:1, backgroundColor:'secondary', mb:15}}>
                <CardPid pids={pids} />
            </Grid>
        </Box>
    )
}

export default Home;
