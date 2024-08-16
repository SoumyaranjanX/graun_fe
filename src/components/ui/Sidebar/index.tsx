import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { GoHome } from 'react-icons/go';
import { IoMenu } from 'react-icons/io5';
import { CiDeliveryTruck } from 'react-icons/ci';
import { PiNotePencilThin } from 'react-icons/pi';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { PiChefHatLight } from 'react-icons/pi';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiHelpCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routingConstants';
import Tooltip from '@mui/material/Tooltip';
import '@/utils/auth/index.css';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  minHeight: '70vh',
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
}));

interface SideNavBarProps {
  activePage: string; // Assuming activePage is of type string, adjust as needed
  setActivePage: React.Dispatch<React.SetStateAction<string>>; // Assuming setActivePage is a state setter function
}

export default function SideNavBar({ activePage, setActivePage }: SideNavBarProps) {
  const navigate = useNavigate();
  const { PUBLIC, PRIVATE } = ROUTES;
  const [open, setOpen] = React.useState(false);
  const goIntigration = () => {
    localStorage.setItem('intigration', 'true');
    navigate(PRIVATE.INTEGRATIONS);
  };

  const handleDrawerClose = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        '& .MuiDrawer-root': {
          position: 'absolute',
        },
        '& .MuiPaper-root': {
          position: 'absolute',
        },
        '& .MuiDrawer-paper': {
          position: 'absolute',
          borderRadius: open ? '16px' : '16px',
        },
      }}
    >
      <DrawerHeader>
        <div
          className="text-[1.5rem] logo"
          style={{
            opacity: open ? 1 : 0,
            fontFamily: "'CircularStdBold', Arial, sans-serif",
            fontWeight: 'bold',
          }}
        >
          GRAUN
        </div>
        <IconButton onClick={handleDrawerClose}>
          <IoMenu />
        </IconButton>
      </DrawerHeader>
      <List
        sx={{
          padding: 2,
        }}
      >
        <Tooltip title="Feature Coming soon" placement="right" arrow>
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            // onClick={() => {
            //   setActivePage('dashboard');
            //   navigate(PRIVATE.DASHBOARD);
            // }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: '16px',
                backgroundColor: activePage === 'dashboard' ? 'black' : 'transparent',
                color: activePage === 'dashboard' ? 'white' : 'black',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <GoHome fill={activePage === 'dashboard' ? 'white' : 'black'} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
        <ListItem
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => {
            setActivePage('order');
            navigate(PRIVATE.ORDER);
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              borderRadius: '16px',
              backgroundColor: activePage === 'order' ? 'black' : 'transparent',
              color: activePage === 'order' ? 'white' : 'black',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <PiNotePencilThin fill={activePage === 'order' ? 'white' : 'black'} />
            </ListItemIcon>
            <ListItemText primary="Orders" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => {
            setActivePage('deliveries');
            navigate(PRIVATE.DELIVERIES);
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              borderRadius: '16px',
              backgroundColor: activePage === 'deliveries' ? 'black' : 'transparent',
              color: activePage === 'deliveries' ? 'white' : 'black',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <CiDeliveryTruck fill={activePage === 'deliveries' ? 'white' : 'black'} />
            </ListItemIcon>
            <ListItemText primary="Deliveries" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <Tooltip title="Feature Coming soon" placement="right" arrow>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <TbBrandGoogleAnalytics />
              </ListItemIcon>
              <ListItemText primary="Analytics" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
        <ListItem
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => {
            goIntigration();
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              borderRadius: '16px',
              backgroundColor: activePage === 'Profile' ? 'black' : 'transparent',
              color: activePage === 'Profile' ? 'white' : 'black',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  color: activePage === 'Profile' ? 'white' : 'black',
                }}
              >
                <PiChefHatLight />
              </div>
            </ListItemIcon>
            <ListItemText primary="Setup Integration" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List
        sx={{
          padding: 2,
        }}
      >
        <Tooltip title="Feature Coming soon" placement="right" arrow>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <IoSettingsOutline />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
        <ListItem
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => {
            setActivePage('helpSupport'), navigate(PRIVATE.HELP_SUPPORT);
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              borderRadius: '16px',
              backgroundColor: activePage === 'helpSupport' ? 'black' : 'transparent',
              color: activePage === 'helpSupport' ? 'white' : 'black',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <FiHelpCircle fill={activePage === 'helpSupport' ? 'white' : 'white'} />
            </ListItemIcon>
            <ListItemText primary="Help & Support" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
