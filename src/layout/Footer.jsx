import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        sx: { flexGrow: 1 },
        width: '100%',
        backgroundColor: '#41b5af14', // o cualquier color de su tema
        padding: '16px',
        position: 'fixed', // Mantiene el footer relativo al contenido
        bottom: 0,
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra más suave y difusa
      }}
    >
      <Typography variant="body2">
        Diseño de Sistemas 2023. Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default Footer;