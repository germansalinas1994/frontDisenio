import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';


const FilterListPID = ({ tipoPids, ucts }) => {

    return (
        <Box sx={{ mt: 3, mb: 5 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box mt={3} mb={3}>
                        <FormControl>
                            <InputLabel id="tipo-pid-label">Tipo PID</InputLabel>
                            <Select
                                sx={{ width: 450 }}
                                labelId="tipo-pid-label"
                                placeholder="Seleccione un tipo PID"
                                id="tipo-pid-select"
                                label="Tipo PID"

                                // onChange={onTipoPidChange}
                                defaultValue="" // Asegúrate de que el valor por defecto sea ""
                            >
                                <MenuItem value="" disabled>Seleccione un tipo PID</MenuItem>
                                {tipoPids.map((tipoPid) => (
                                    <MenuItem key={tipoPid.idTipoPid} value={tipoPid.idTipoPid}>{tipoPid.descripcion}</MenuItem>
                                ))}
                            </Select>



                        </FormControl>

                        <FormControl sx={{ ml: 3 }}>
                            <InputLabel id="uct-label">UCT</InputLabel>
                            <Select
                                sx={{ width: 450 }}

                                labelId="uct-label"
                                placeholder="Seleccione una UCT"
                                id="uct-select"
                                label="UCT"
                                defaultValue="" // Asegúrate de que el valor por defecto sea ""
                            >
                                <MenuItem value="" disabled>Seleccione una UCT</MenuItem>
                                {ucts.map((uct) => (
                                    <MenuItem key={uct.idUct} value={uct.idUct}>{uct.denominacion}</MenuItem>
                                ))}
                            </Select>



                        </FormControl>
                    </Box>

                </AccordionDetails>


                <Box sx={{ textAlign: 'center', mt: 2, mb:3 }}>
                    <Button
                        sx={{
                            mt: 1, mr: 2, width: '120px', textTransform: 'none',
                        }}
                        size="large"
                        variant="outlined"
                        color="primary"

                        // onClick={handleClose}
                    >
                        Limpiar 
                    </Button>
                    <Button
                        size="large"
                        sx={{
                            mt: 1, width: '120px', color: 'white', textTransform: 'none',
                        }}
                        variant="contained"
                        color="primary"

                    >
                        Buscar
                    </Button>
                </Box>
            </Accordion>
        </Box>

    )
}

export default FilterListPID;