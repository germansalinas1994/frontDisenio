import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#41b5af14',
        padding: '16px',
        position: 'relative', // Cambie a 'relative'
        bottom: 0,
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography variant="body2">
        Diseño de Sistemas 2023. Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default Footer;