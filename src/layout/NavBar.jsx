import * as React from 'react';
import { useContext } from 'react';
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ResponsiveAppBar from './ResponsiveAppBar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ThemeContext from './ThemeContext';
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


const drawerWidth = 275;




const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




//componente que se encarga de mostrar el menu lateral


const NavBar = ({ children, themeSwitch }) => {

  
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

  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const [open, setOpen] = React.useState(false);


  // opciones de menu del cliente, armo un arreglo con el Nombre que muestra, la url a la que redirecciona y el icono que muestra

  const clientOptions = [
    {
      name: 'Gestion de Proyectos',
      route: '/orders',
      icon: <LabelOutlined />,
      submenu: [
        { name: 'PID', route: '/orders', icon: <LabelOutlined /> },
        { name: 'INICIATIVA DE INVESTIGACION', route: '/orders', icon: <LabelOutlined /> },
      ],
    },
  
    { name: 'Gestion Financiamiento', route: '/cart', icon: <LabelOutlined /> },
    { name: 'Gestion de Becas', route: '/wishlist', icon: <LabelOutlined /> },
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
      <AppBar position="fixed" open={open}   sx={{backgroundColor:"#B4EAE9"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <ResponsiveAppBar></ResponsiveAppBar>
          {/* {themeSwitch} Agrega esto al final para que se coloque al margen derecho */}
          <FormControlLabel
            control={
              <Switch
                checked={isDarkTheme}
                onChange={toggleTheme}
                icon={<Brightness7Icon />}
                checkedIcon={<Brightness4Icon />}
              />
            }
            label={isDarkTheme ? 'Tema Oscuro' : 'Tema Claro'}
          />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {/* el theme direction es para que el icono de la flecha cambie de lado cuando se abre el menu */}
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        
        <List>
        {clientOptions.map((option) => (
          <React.Fragment key={option.name}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={option.name === 'Gestion de Proyectos' ? handleProyectosClick : () => handleNavigation(option.route)}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.name} sx={{ opacity: open ? 1 : 0}} primaryTypographyProps={{ style: { fontWeight: 'bold' } }} />
              </ListItemButton>
            </ListItem>
              {option.name === 'Gestion de Proyectos' && option.submenu && (
                <Collapse in={isSubmenuOpen} timeout="auto" unmountOnExit>
                  <List sx={{ paddingLeft: 0 }}>
                    {option.submenu.map((subItem) => (
                      <ListItem
                        key={subItem.name}
                        disablePadding
                        sx={{ display: 'block', paddingLeft: 2,  backgroundColor: '#B4EAE9' }}
                      >
                        <ListItemButton onClick={() => handleNavigation(subItem.route)} sx={{backgroundcolor: '#B4EAE9' }}>
                          {/*<ListItemIcon>{subItem.icon}</ListItemIcon>*/}
                          <ListItemText primary={subItem.name} sx={{ opacity: open ? 1 : 0}} primaryTypographyProps={{ style: { fontWeight: 'bold' } }} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
       
        
            
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}

      </Box>

    </Box>




  );
}

export default NavBar;
