// ModalFormCategoria.jsx
import React, { useEffect } from 'react';

import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import EditIcon from '@mui/icons-material/Edit';


const ModalDetallePID = ({ open, handleClose, pid, ucts, tipoPids, universidades, onSubmit, register, errors, reset, watch, onTipoPidChange, onUctChange, onUniversidadChange, fechaDesde, fechaHasta, onFechaDesdeChange, onFechaHastaChange, isEditMode, toggleEditMode }) => {

    useEffect(() => {
        debugger;
        if (pid && open) {
            reset({
                director: pid.director,
                denominacion: pid.denominacion,
                tipoPid: pid.tipoPid.idTipoPid,
                universidad: pid.universidad.idUniversidad,
                fechaDesde: dayjs(pid.fechaDesde),
                fechaHasta: dayjs(pid.fechaHasta),
                uct: pid.uct.idUct,
            });
        }
    }, [pid, open, reset]);


    return (
        <Modal
            open={open}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            onClose={handleClose}
            disableEscapeKeyDown={true} // Impide el cierre del modal al presionar la tecla Escape
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '75%', md: '600px' },
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: { xs: 2, sm: 3, md: 4 },
                }}
                component="form"
                onSubmit={onSubmit}
            >
                <IconButton
                    aria-label="cerrar"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography id="modal-title" variant="h5" component="h2">
                    Detalle PID
                    <IconButton onClick={toggleEditMode}>
                        <EditIcon />
                    </IconButton>
                </Typography>
                <Box mt={3} mb={3}>

                    <TextField
                        type="hidden"
                        style={{ display: 'none' }} // Asegúrate de que esté oculto
                        {...register("idPid")}
                        defaultValue={pid?.idPid}
                    />

                    <Box mt={2}>
                        <TextField fullWidth
                            mb={2}
                            label="Nombre Director"
                            placeholder="Ingrese el nombre del director"
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}

                            // value={pid?.director} 

                            {...register("director",
                                {
                                    required: "El nombre del director es obligatorio",
                                    pattern: {
                                        value: /^[a-zA-Z\s]*$/,
                                        message: "El nombre debe contener solo letras"
                                    }

                                })
                            }
                            error={Boolean(errors.director)}
                            helperText={errors.director && errors.director.message}

                        />
                    </Box>

                    <Box mt={3} mb={3}>
                        <TextField fullWidth
                            label="Nombre PID"
                            placeholder="Ingrese el nombre del PID"
                            // value={pid?.denominacion} 
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}

                            {...register("denominacion",
                                {
                                    required: "El nombre del PID es obligatorio",
                                    pattern: {
                                        value: /^[a-zA-Z\s]*$/,
                                        message: "El nombre debe contener solo letras"
                                    }

                                })
                            }
                            error={Boolean(errors.denominacion)}
                            helperText={errors.denominacion && errors.denominacion.message}

                        />
                    </Box>

                    <Box mt={3} mb={3}>
                        <FormControl fullWidth error={Boolean(errors.tipoPid)}>
                            <InputLabel id="tipo-pid-label">Tipo PID</InputLabel>
                            <Select
                                value={watch("tipoPid")}
                                labelId="tipo-pid-label"
                                placeholder="Seleccione un tipo PID"
                                id="tipo-pid-select"
                                label="Tipo PID"
                                {...register("tipoPid", { required: "Este campo es obligatorio" })}
                                onChange={onTipoPidChange}
                                disabled={!isEditMode}

                            >
                                <MenuItem value="" disabled>Seleccione un tipo PID</MenuItem>
                                {tipoPids.map((tipoPid) => (
                                    <MenuItem key={tipoPid.idTipoPid} value={tipoPid.idTipoPid}>{tipoPid.descripcion}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="caption" color="error">
                                {errors.tipoPid && errors.tipoPid.message}
                            </Typography>
                        </FormControl>
                    </Box>

                    <Box mt={3} mb={3}>
                        <FormControl fullWidth error={Boolean(errors.universidad)}>
                            <InputLabel id="universidad-label">Universidad</InputLabel>
                            <Select
                                value={watch("universidad")}
                                labelId="universidad-label"
                                placeholder="Seleccione una universidad"
                                id="universidad-select"
                                label="Universidad"
                                {...register("universidad", { required: "Este campo es obligatorio" })}
                                onChange={onUniversidadChange}
                                disabled={!isEditMode}


                            >
                                <MenuItem value="" disabled>Seleccione una universidad</MenuItem>
                                {universidades.map((universidad) => (
                                    <MenuItem key={universidad.idUniversidad} value={universidad.idUniversidad}>{universidad.nombre}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="caption" color="error">
                                {errors.universidad && errors.universidad.message}
                            </Typography>
                        </FormControl>
                    </Box>

                    <Box mt={3} mb={3}>
                        <FormControl fullWidth error={Boolean(errors.uct)}>
                            <InputLabel id="uct-label">UCT</InputLabel>
                            <Select
                                value={watch("uct")}
                                labelId="uct-label"
                                placeholder="Seleccione una UCT"
                                id="uct-select"
                                label="UCT"
                                {...register("uct", { required: "Este campo es obligatorio" })}
                                defaultValue="" // Asegúrate de que el valor por defecto sea ""
                                onChange={onUctChange}
                                disabled={!isEditMode}

                            >
                                <MenuItem value="" disabled>Seleccione una UCT</MenuItem>
                                {ucts.map((uct) => (
                                    <MenuItem key={uct.idUct} value={uct.idUct}>{uct.denominacion}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="caption" color="error">
                                {errors.uct && errors.uct.message}
                            </Typography>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1 }}>
                        <DatePicker
                            label="Fecha Desde"
                            value={pid ? dayjs(pid.fechaDesde) : null}
                            disabled={!isEditMode}


                            onChange={onFechaDesdeChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="Fecha Hasta"
                            value={pid ? dayjs(pid.fechaHasta) : null}
                            disabled={!isEditMode}

                            onChange={onFechaHastaChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>

                    {
                        isEditMode && (
                            <Box sx={{ textAlign: 'center', mt: 3 }}>
                                <Button
                                    sx={{
                                        mt: 1, mr: 2, width: '120px', textTransform: 'none',
                                    }}
                                    size="large"
                                    variant="outlined"
                                    color="primary"

                                    onClick={handleClose}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    size="large"
                                    sx={{
                                        mt: 1, width: '120px', color: 'white', textTransform: 'none',
                                    }}
                                    variant="contained"
                                    color="primary"

                                    type="submit"
                                >
                                    Guardar
                                </Button>
                            </Box>
                        )

                    }


                </Box>
            </Box>
        </Modal>
    );
}

export default ModalDetallePID;
