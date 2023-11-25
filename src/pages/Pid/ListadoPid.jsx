import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
import TablaPid from '../../components/TablaPid';
import BotonAgregar from '../../components/Agregar';
import LoadingModal from '../../components/LoadingModal';
import { get, useForm } from "react-hook-form"
import ModalFormPID from '../../components/ModalFormPID';
import Swal from 'sweetalert2'
import dayjs from 'dayjs';
import { set } from 'date-fns';



const ListadoPid = () => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();




    const apiLocalKey = import.meta.env.VITE_APP_API_KEY
    const [pids, setPids] = useState([]);
    const [ucts, setUcts] = useState([]);
    const [tipoPids, setTipoPids] = useState([]);
    const [universidades, setUniversidades] = useState([]);
    const [fechaDesde, setFechaDesde] = useState(null);
    const [fechaHasta, setFechaHasta] = useState(null);
    //codigo para mostrar u ocultar el modal de carga
    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    //el reload es para que cuando se actualice la tabla se vuelva a llamar a la api
    const [reload, setReload] = useState(false);
    const [openModal, setOpenModal] = useState(false);


    useEffect(() => {
        try {
            showLoadingModal();
            debugger;
            GetPid();
            GetUct();
            GetTipoPid();
            GetUniversidad();
        } catch (error) {
            console.log(error)
            hideLoadingModal();
        }
    }, [reload])

    const GetPid = async () => {
        try {
            const res = await axios.get(apiLocalKey + '/pid')
            setPids(res.data.result.data)
            hideLoadingModal();
            console.log(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const GetUct = async () => {
        try {
            const res = await axios.get(apiLocalKey + '/uct')
            setUcts(res.data.result.data)
            hideLoadingModal();
            console.log(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const GetTipoPid = async () => {
        try {
            const res = await axios.get(apiLocalKey + '/tipoPid')
            setTipoPids(res.data.result.data)
            hideLoadingModal();
            console.log(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const GetUniversidad = async () => {
        try {
            const res = await axios.get(apiLocalKey + '/universidad')
            setUniversidades(res.data.result.data)
            hideLoadingModal();
            console.log(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }
    


    //funciones para ABM de pids

    const handleDeletePID = async (id) => {
        try {
            //pregunto si esta seguro de eliminar la categoria
            Swal.fire({
                title: '¿Estás seguro de eliminar el PID?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showConfirmButton: true,

                showCancelButton: true,
                allowOutsideClick: false,
                reverseButtons: true, //invierte la ubicacion de los botones confirmar y cancelar

                confirmButtonColor: '#D32F2F',
                cancelButtonColor: '#6E8EA7',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    showLoadingModal();
                    //si esta seguro, elimino la categoria
                    const response = await axios.put(apiLocalKey + '/pid/' + id);
                    //muestro el msj de exito
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        allowOutsideClick: false,
                        title: 'PID eliminado correctamente',
                        showConfirmButton: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //aca deberia recargar el componente para que se vea la nueva categoria
                            //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                            //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                            setReload(prev => !prev);
                            hideLoadingModal();

                        }
                    })
                }
            })
        } catch (error) {
            hideLoadingModal();
            Swal.fire({
                position: 'center',
                icon: 'error',
                allowOutsideClick: false,
                title: 'Hubo un error al eliminar el PID',
                showConfirmButton: true,
            });
        }
    };

    const onSubmit = async (data) => {

        debugger;
        setValue("fechaHasta", dayjs(data.fechaHasta).format('YYYY-MM-DD'));
        setValue("fechaDesde", dayjs(data.fechaDesde).format('YYYY-MM-DD'));

      


        if (dayjs(data.fechaDesde).isAfter(data.fechaHasta)) {
            // Maneja el error aquí
            return;
        }

        try {
            showLoadingModal();
            //si esta seguro, elimino la categoria
            const response = await axios.post(apiLocalKey + '/pid', data);
            //muestro el msj de exito
            Swal.fire({
                position: 'center',
                icon: 'success',
                allowOutsideClick: false,
                title: 'PID agregado correctamente',
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    //aca deberia recargar el componente para que se vea la nueva categoria
                    //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                    //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                    setReload(prev => !prev);
                    hideLoadingModal();

                }
            })
        } catch (error) {
            hideLoadingModal();
            Swal.fire({
                position: 'center',
                icon: 'error',
                allowOutsideClick: false,
                title: 'Hubo un error al agregar el PID',
                showConfirmButton: true,
            });
        }
    }








    //funciones para el modal, abrir y cerrar

    const handleOpenModal = () => {
        setOpenModal(true);
    }


    const handleCloseModal = async () => {
        reset(
            {
                denominacion: "",
                director: "",
                fechaDesde: "",
                fechaHasta: "",
                tipoPid: "",
                uct: "",
                universidad: "",
            }
        );
        await setOpenModal(false);
    }

    const handleTipoPidChange = (event) => {
        setValue("tipoPid", event.target.value, { shouldValidate: true });
    };

    const handleUctChange = (event) => {
        setValue("uct", event.target.value, { shouldValidate: true });
    }
    const handleUniversidadChange = (event) => {
        setValue("universidad", event.target.value, { shouldValidate: true });
    }

    const handleFechaDesdeChange = (newValue) => {
        const formattedDate = dayjs(newValue).format('DD/MM/YYYY'); // Formato para Argentina
        setValue("fechaDesde", formattedDate);
        };

    const handleFechaHastaChange = (newValue) => {
        const formattedDate = dayjs(newValue).format('DD/MM/YYYY'); // Formato para Argentina
        setValue("fechaHasta", formattedDate);
    };




    return (
        <>

            <Box >
                <Typography variant="h4" component="h2" gutterBottom>
                    Listado de PID
                </Typography>
                <BotonAgregar onClick={handleOpenModal}></BotonAgregar>

                {/* Hago un componente para el modal, para que sea mas facil de leer */}
                {/* Hago un componente para el modal, para que sea mas facil de leer */}
                <ModalFormPID
                    open={openModal}
                    handleClose={handleCloseModal}
                    ucts={ucts}
                    tipoPids={tipoPids}
                    universidades={universidades}
                    onTipoPidChange={handleTipoPidChange} // Pasar la función al componente hijo
                    onUctChange={handleUctChange}
                    onUniversidadChange={handleUniversidadChange}

                    fechaDesde={fechaDesde}
                    fechaHasta={fechaHasta}
                    onFechaDesdeChange={handleFechaDesdeChange}
                    onFechaHastaChange={handleFechaHastaChange}




                    onSubmit={handleSubmit(onSubmit)}
                    register={register}
                    errors={errors}
                    reset={reset}

                />

                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 6 }}>

                    <TablaPid pids={pids} onDelete={handleDeletePID} />
                </Grid>
            </Box>


        </>
    )
};

export default ListadoPid;