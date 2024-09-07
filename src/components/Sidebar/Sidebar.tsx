import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '../../hooks/useUser';
import { Divider } from '@mui/material';

const SidebarList = [
  { id: '1', text: 'Home', icon: <HomeIcon />, link: '/' },
  { id: '2', text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
  { id: '3', text: 'Create Doc', icon: <NoteAddIcon />, link: '/create' },
  { id: '4', text: 'Recent Docs', icon: <DescriptionIcon />, link: '/recent' },
  { id: '5', text: 'Search Doc', icon: <FindInPageIcon />, link: '/search' },
  { id: '6', text: 'About', icon: <InfoIcon />, link: '/about' },
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const { userInfo, login, logout } = useUser();

  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
      <List>
        {SidebarList.map(({ id, text, icon, link }) => (
          <ListItem key={id} disablePadding sx={{ margin: 0 }}>
            <ListItemButton onClick={() => navigate(link)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem key='logout' disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const LoginDrawer = (
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
      <List>
        <ListItem key='1' disablePadding>
          <ListItemButton onClick={login}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary='Login' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon fontSize='large' sx={{ color: '#fff' }} />
      </Button>
      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        {userInfo ? DrawerList : LoginDrawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
