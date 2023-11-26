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
import theme from '../../layout/theme.js';
import ModalDetallePID from '../../components/ModalDetallePID';




const ListadoPid = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm();

    const [isEditMode, setIsEditMode] = useState(false);


    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const [pids, setPids] = useState([]);
    const [ucts, setUcts] = useState([]);
    const [tipoPids, setTipoPids] = useState([]);
    const [universidades, setUniversidades] = useState([]);
    const [fechaDesde, setFechaDesde] = useState(dayjs());
    const [fechaHasta, setFechaHasta] = useState(dayjs().add(1, "month"));
    //codigo para mostrar u ocultar el modal de carga
    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    //el reload es para que cuando se actualice la tabla se vuelva a llamar a la api
    const [reload, setReload] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalDetalle, setOpenModalDetalle] = useState(false);
    const [pid, setPid] = useState(null);

    useEffect(() => {
        try {
            showLoadingModal();
            setFechasInicioFin();
            debugger;
            GetPid();
            GetUct();
            GetTipoPid();
            GetUniversidad();
            hideLoadingModal();
        } catch (error) {
            console.log(error)
            hideLoadingModal();
        }
    }, [reload])


    const setFechasInicioFin = () => {
        const today = dayjs();
        const monthLater = today.add(1, "month");
        setValue("fechaDesde", today.format("DD/MM/YYYY"));
        setValue("fechaHasta", monthLater.format("DD/MM/YYYY"));

    };


    const GetPid = async () => {
        try {
            const res = await axios.get(apiLocalKey + '/pid')
            setPids(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const GetUct = async () => {
        try {
            const res = await axios.get(apiLocalKey + '/uct')
            setUcts(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }


    const GetTipoPid = async () => {
        try {
            const res = await axios.get(apiLocalKey + '/tipoPid')
            setTipoPids(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }


    const GetUniversidad = async () => {
        try {
            const res = await axios.get(apiLocalKey + '/universidad')
            setUniversidades(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }


    //funciones para ABM de pids

    const handleDeletePID = async (id) => {
        try {
            //pregunto si esta seguro de eliminar la categoria
            Swal.fire({
                title: "¿Estás seguro de eliminar el PID?",
                text: "No podrás revertir esto!",
                icon: "warning",
                showConfirmButton: true,

                showCancelButton: true,
                allowOutsideClick: false,
                reverseButtons: true, //invierte la ubicacion de los botones confirmar y cancelar

                confirmButtonColor: theme.palette.error.main,
                cancelButtonColor: theme.palette.primary.main,

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
        //Oculto el modal
        handleCloseModal();

        setValue("fechaHasta", dayjs(data.fechaHasta).format("DD/MM/YYYY"));
        setValue("fechaDesde", dayjs(data.fechaDesde).format("DD/MM/YYYY"));

        let valida = await validarFechas(data.fechaDesde, data.fechaHasta);
        debugger;

        if (!valida) {
            Swal.fire({
                position: "center",
                icon: "error",
                allowOutsideClick: false,
                title:
                    "Las fechas son obligatorias y debe ingresar una fecha de inicio menor a la fecha de fin",
                showConfirmButton: true,
            });
            setFechasInicioFin();
            return;
        } else {
            try {
                showLoadingModal();
                //si esta seguro, elimino la categoria
                const response = await axios.post(apiLocalKey + "/pid", data);
                //muestro el msj de exito
                Swal.fire({
                    position: "center",
                    icon: "success",
                    allowOutsideClick: false,
                    title: "PID agregado correctamente",
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        //aca deberia recargar el componente para que se vea la nueva categoria
                        //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                        //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                        setReload((prev) => !prev);
                        hideLoadingModal();
                        setFechasInicioFin();
                    }
                });
            } catch (error) {
                hideLoadingModal();
                Swal.fire({
                    position: "center",
                    icon: "error",
                    allowOutsideClick: false,
                    title: "Hubo un error al agregar el PID",
                    showConfirmButton: true,
                });
                setFechasInicioFin();
            }
        }
    };


    const validarFechas = async (fechaDesde, fechaHasta) => {
        let valida = true;

        // Parsear las fechas en el formato DD/MM/YYYY
        const parsedFechaDesde = dayjs(fechaDesde, "DD/MM/YYYY");
        const parsedFechaHasta = dayjs(fechaHasta, "DD/MM/YYYY");

        // Verificar si alguna de las fechas es inválida después del parseo
        if (!parsedFechaDesde.isValid() || !parsedFechaHasta.isValid()) {
            valida = false;
            return valida;
        }

        // Verificar que la fecha de inicio sea menor o igual a la fecha de fin
        if (parsedFechaDesde.isAfter(parsedFechaHasta)) {
            valida = false;
        }

        return valida;
    };


    const toggleEditMode = () => {
        debugger;
        setIsEditMode(prev => !prev);
    };

    const onSubmitEdit = async (data) => {
        debugger;
        //Oculto el modal
        handleCloseModalDetalle();

        setValue("fechaHasta", dayjs(data.fechaHasta).format("DD/MM/YYYY"));
        setValue("fechaDesde", dayjs(data.fechaDesde).format("DD/MM/YYYY"));

        let valida = await validarFechas(data.fechaDesde, data.fechaHasta);
        debugger;

        if (!valida) {
            Swal.fire({
                position: "center",
                icon: "error",
                allowOutsideClick: false,
                title:
                    "Las fechas son obligatorias y debe ingresar una fecha de inicio menor a la fecha de fin",
                showConfirmButton: true,
            });
            setFechasInicioFin();
            return;
        } else {
            try {
                showLoadingModal();
                //si esta seguro, elimino la categoria
                const response = await axios.put(apiLocalKey + "/pid", data);
                //muestro el msj de exito
                Swal.fire({
                    position: "center",
                    icon: "success",
                    allowOutsideClick: false,
                    title: "PID editado correctamente",
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        //aca deberia recargar el componente para que se vea la nueva categoria
                        //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                        //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                        setReload((prev) => !prev);
                        hideLoadingModal();
                        setFechasInicioFin();
                    }
                });
            } catch (error) {
                hideLoadingModal();
                Swal.fire({
                    position: "center",
                    icon: "error",
                    allowOutsideClick: false,
                    title: "Hubo un error al agregar el PID",
                    showConfirmButton: true,
                });
                setFechasInicioFin();
            }
        }
    };



    //Funciones para el modal de detalle de un PID

    const handleDetallePID = async (id) => {
        try {
            showLoadingModal();
            const res = await axios.get(apiLocalKey + '/pid/' + id)
            setPid(res.data.result.data)
            setValue("fechaDesde", dayjs(res.data.result.data.fechaDesde).format("DD/MM/YYYY"));
            setValue("fechaHasta", dayjs(res.data.result.data.fechaHasta).format("DD/MM/YYYY"));
            debugger;


            await hideLoadingModal();
            await setOpenModalDetalle(true);
        } catch (error) {
            console.log(error)
            hideLoadingModal();
        }
    }

    const handleCloseModalDetalle = async (event, reason) => {
        if (reason == 'backdropClick') {
            return;
        }
        setIsEditMode(false);
        reset({
            denominacion: "",
            director: "",
            fechaDesde: dayjs().format("DD/MM/YYYY"),
            fechaHasta: dayjs().add(1, "month").format("DD/MM/YYYY"),
            tipoPid: "",
            uct: "",
            universidad: "",
        });
        setOpenModalDetalle(false);
    };












    //funciones para el modal, abrir y cerrar

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = async (event, reason) => {
        // Si se hace click en el backdrop, no se cierra el modal
        if (reason == 'backdropClick') {
            return;
        }

        // Si se hace click en el botón de cancelar o en la X, se cierra el modal y se resetea el formulario

        reset({
            denominacion: "",
            director: "",
            fechaDesde: dayjs().format("DD/MM/YYYY"),
            fechaHasta: dayjs().add(1, "month").format("DD/MM/YYYY"),
            tipoPid: "",
            uct: "",
            universidad: "",
        });
        await setOpenModal(false);
    };


    const handleTipoPidChange = (event) => {
        debugger;
        setValue("tipoPid", event.target.value, { shouldValidate: true });
    };

    const handleUctChange = (event) => {
        setValue("uct", event.target.value, { shouldValidate: true });
    };
    const handleUniversidadChange = (event) => {
        setValue("universidad", event.target.value, { shouldValidate: true });
    };

    const handleFechaDesdeChange = (newValue) => {
        const formattedDate = dayjs(newValue).format("DD/MM/YYYY"); // Formato para Argentina
        setValue("fechaDesde", formattedDate);
    };

    const handleFechaHastaChange = (newValue) => {
        const formattedDate = dayjs(newValue).format("DD/MM/YYYY"); // Formato para Argentina
        setValue("fechaHasta", formattedDate);
    };

    return (
        <>

            <Box style={{ position: 'relative' }}>
                <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '20px' }}>
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


                <ModalDetallePID
                    open={openModalDetalle}
                    handleClose={handleCloseModalDetalle}
                    pid={pid}
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
                    onSubmit={handleSubmit(onSubmitEdit)}
                    register={register}
                    errors={errors}
                    reset={reset}
                    watch={watch}
                    isEditMode={isEditMode}
                    toggleEditMode={toggleEditMode}
                />


                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 6 }}
                >
                    <TablaPid pids={pids} onDelete={handleDeletePID} detallePID={handleDetallePID} />
                </Grid>
            </Box>
        </>
    );
};

export default ListadoPid;
