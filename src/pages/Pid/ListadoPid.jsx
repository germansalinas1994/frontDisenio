import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
import TablaPid from '../../components/TablaPid';
import BotonAgregar from '../../components/Agregar';



const ListadoPid = () => {

    const apiLocalKey = import.meta.env.VITE_APP_API_KEY
    const [pids, setPids] = useState([]);

    useEffect(() => {
        try {
            GetPid()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const GetPid = async () => {
        try {
            const res = await axios.get(apiLocalKey + '/pid')
            debugger;
            setPids(res.data.result.data)
            console.log(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <Box >
                <Typography variant="h4" component="h2" gutterBottom>
                    Listado de PID
                </Typography>
                <BotonAgregar></BotonAgregar>

                {/* Hago un componente para el modal, para que sea mas facil de leer */}

                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 6 }}>

                    <TablaPid pids={pids}  />
                </Grid>
            </Box>


        </>
    )
};

export default ListadoPid;