import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';


const FilterListPID = ({ tipoPids, ucts, limpiar, tipoPid,uct, changeTipoPid, changeUCT,buscar }) => {

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
                                value={tipoPid}
                                onChange={changeTipoPid}


                                // onChange={onTipoPidChange}
                            >
                                <MenuItem value={0}>Ninguno</MenuItem>
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
                                value={uct}
                                onChange={changeUCT}
                            >
                                <MenuItem value={0}>Ninguno</MenuItem>
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

                        onClick={limpiar}
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
                        onClick={buscar}

                    >
                        Buscar
                    </Button>
                </Box>
            </Accordion>
        </Box>

    )
}

export default FilterListPID;