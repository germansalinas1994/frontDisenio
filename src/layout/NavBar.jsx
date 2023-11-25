import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ResponsiveAppBar from './ResponsiveAppBar';

import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBasket,
  ShoppingCart,
  Favorite,
  History,
  AccountCircle,
  Help,
  Store,
  BarChart,
  Storefront,
  RateReview,
  Settings,
  LabelOutlined,
  Label,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import logo from '../../public/logo-utn.png'


const drawerWidth = 350; // Aumentar el ancho del drawer



const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...openedMixin(theme),
  '& .MuiDrawer-paper': openedMixin(theme),
}));




//componente que se encarga de mostrar el menu lateral


const NavBar = ({ children }) => {


  const navigate = useNavigate();

  const handleNavigation = (route) => {
    debugger;
    navigate(route);
    //este metodo es para cerrar el menu cuando se hace click en un item
    // handleDrawerClose();
  }
  // Agrega el estado local para rastrear si el submenú está abierto o cerrado
  const [isSubmenuOpen, setSubmenuOpen] = React.useState(false);

  // Función para manejar el clic en "Gestión de Proyectos"
  const handleProyectosClick = () => {
    setSubmenuOpen(!isSubmenuOpen);
  };

  const theme = useTheme();


  const [open, setOpen] = React.useState(true);


  // opciones de menu del cliente, armo un arreglo con el Nombre que muestra, la url a la que redirecciona y el icono que muestra



  const clientOptions = [
    {
      name: 'Gestion de Proyectos',
      icon: <LabelOutlined />,
      submenu: [
        { name: 'PID', route: '/pid', icon: <LabelOutlined /> },
        { name: 'INICIATIVA DE INVESTIGACION', route: '/iniciativadeinvestigacion', icon: <LabelOutlined /> },
      ],
    },

    { name: 'Gestion Financiamiento', route: '/financiamiento', icon: <LabelOutlined /> },
    { name: 'Gestion de Becas', route: '/becas', icon: <LabelOutlined /> },
  ];


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#B4EAE9" }}>
        <Toolbar>
          <ResponsiveAppBar></ResponsiveAppBar>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#41B5AF' // Color de fondo aplicado aquí
          }
        }}
      >
        {/*Quiero hacer un link a home que sea el logo  */}

        <DrawerHeader>
            <Link href="/" underline="none">
              <img src={logo} alt="UTN Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
            </Link>

        </DrawerHeader>


        <Box sx={{ mt: 6 }}>
          <List style={{ width: '100%', textAlign: 'center' }}>
            {clientOptions.map((option) => (
              <React.Fragment key={option.name}>
                <ListItem disablePadding sx={{ display: 'block', mt: 2 }}>
                  <ListItemButton
                    onClick={option.name === 'Gestion de Proyectos' ? handleProyectosClick : () => handleNavigation(option.route)}
                  >
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.name} primaryTypographyProps={{ style: { fontWeight: 'bold' } }} />
                  </ListItemButton>
                </ListItem>
                {option.name === 'Gestion de Proyectos' && option.submenu && (
                  <Collapse in={isSubmenuOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {option.submenu.map((subItem) => (
                        <ListItem key={subItem.name} disablePadding sx={{ display: 'block', paddingLeft: 4 }}>
                          <ListItemButton onClick={() => handleNavigation(subItem.route)}>
                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                            <ListItemText primary={subItem.name} primaryTypographyProps={{ style: { fontWeight: 'bold' } }} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}

      </Box>

    </Box>




  );
}

export default NavBar;
