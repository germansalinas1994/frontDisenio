// ModalFormCategoria.jsx

import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const ModalFormPID = ({ open, handleClose, ucts, tipoPids, universidades, onSubmit, register, errors, reset, onTipoPidChange, onUctChange, onUniversidadChange, fechaDesde, fechaHasta, onFechaDesdeChange, onFechaHastaChange }) => {




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
                    Nuevo Proyecto
                </Typography>
                <Box mt={3} mb={3}>

                    <Box mt={2}>
                        <TextField fullWidth
                            label="Nombre PID"
                            placeholder="Ingrese el nombre del PID"
                            InputLabelProps={{ shrink: true }}

                            {...register("denominacion",
                                {
                                    required: "El nombre del PID es obligatorio",
                                    // pattern: {
                                    //     value: /^[a-zA-Z\s]*$/,
                                    //     message: "El nombre debe contener solo letras"
                                    // }

                                })
                            }
                            error={Boolean(errors.denominacion)}
                            helperText={errors.denominacion && errors.denominacion.message}

                        />

                    </Box>

                    <Box mt={3} mb={3}>
                        <TextField fullWidth
                            mb={2}
                            label="Nombre Director"
                            placeholder="Ingrese el nombre del director"
                            InputLabelProps={{ shrink: true }}

                            {...register("director",
                                {
                                    required: "El nombre del director es obligatorio",
                                    pattern: {
                                        value: /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/, // Permitir letras y tildes
                                        message: "El nombre debe contener solo letras"
                                    }

                                })
                            }
                            error={Boolean(errors.director)}
                            helperText={errors.director && errors.director.message}

                        />
                    </Box>

                    <Box mt={3} mb={3}>
                        <FormControl fullWidth error={Boolean(errors.tipoPid)}>
                            <InputLabel id="tipo-pid-label">Tipo PID</InputLabel>
                            <Select
                                labelId="tipo-pid-label"
                                placeholder="Seleccione un tipo PID"
                                id="tipo-pid-select"
                                label="Tipo PID"
                                {...register("tipoPid", { required: "Este campo es obligatorio" })}
                                onChange={onTipoPidChange}
                                defaultValue="" // Asegúrate de que el valor por defecto sea ""
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
                                labelId="universidad-label"
                                placeholder="Seleccione una universidad"
                                id="universidad-select"
                                label="Universidad"
                                {...register("universidad", { required: "Este campo es obligatorio" })}
                                defaultValue="" // Asegúrate de que el valor por defecto sea ""
                                onChange={onUniversidadChange}

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
                                labelId="uct-label"
                                placeholder="Seleccione una UCT"
                                id="uct-select"
                                label="UCT"
                                {...register("uct", { required: "Este campo es obligatorio" })}
                                defaultValue="" // Asegúrate de que el valor por defecto sea ""
                                onChange={onUctChange}
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
                            value={fechaDesde}

                            onChange={onFechaDesdeChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="Fecha Hasta"
                            value={fechaHasta}
                            onChange={onFechaHastaChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>




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
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalFormPID;
