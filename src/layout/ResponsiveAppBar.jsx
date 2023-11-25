import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import PinterestIcon from '@mui/icons-material/Pinterest';



// Declaro un array de objetos con las propiedades id, name y route. 
// Luego, en el componente ResponsiveAppBar, itero sobre ese array y muestro los elementos en el menú de navegación.


const settings = [
  { id: 1, name: 'Logout', route: '/logout' }
]


function ResponsiveAppBar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };






  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container style={{ maxWidth: '100%', height: '100px'}} maxWidth="xxl" >
      <Toolbar disableGutters>

 
        <h3 style={{ color: 'inherit', textDecoration: 'none', display: 'flex', marginTop: '20px' }}>

          <Typography
            variant="h5"
            //noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'roboto',
              fontSize: 50,
              // fontWith: '100px',
              fontWeight: 500,
              // letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PROYECTOS DE INVESTIGACION Y
            DESARROLLO
          </Typography>
        </h3>



        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title="Open settings">
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '0px' }}>
              {/* Otros elementos si los hay */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* en el src del avatar va la imagen del usuario, por ahora es una imagen de prueba, después va a ser la imagen del usuario logueado */}
                <Avatar alt="Remy Sharp" src="https://www.frp.utn.edu.ar/info2/wp-content/uploads/2018/08/utn-nacional.jpg" />
              </IconButton>
            </div>
          </Tooltip>
          <Menu
            sx={{ mt: '50px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <Link to={setting.route.toLowerCase()} style={{ color: 'inherit', textDecoration: 'none' }}>
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container >
  );
}
export default ResponsiveAppBar;
