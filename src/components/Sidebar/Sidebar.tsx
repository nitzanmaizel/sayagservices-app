import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Divider, Box, Drawer, Button } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { useUser } from '../../hooks/useUser';
import IconWrapper from '../IconWrapper/IconWrapper';

const SidebarList = [
  { id: '1', text: 'Home', icon: 'home', link: '/' },
  { id: '2', text: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
  { id: '3', text: 'Create Doc', icon: 'addDoc', link: '/create' },
  { id: '4', text: 'Recent Docs', icon: 'doc', link: '/recent' },
  { id: '5', text: 'Search Doc', icon: 'searchDoc', link: '/search' },
  { id: '6', text: 'About', icon: 'info', link: '/about' },
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
              <ListItemText primary={text} />
              <ListItemIcon>
                <IconWrapper type={icon} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem key='logout' disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemText primary='Logout' />
            <ListItemIcon>
              <IconWrapper type='logout' />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const LoginDrawer = (
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
      <List>
        <ListItem key='login' disablePadding>
          <ListItemButton onClick={login}>
            <ListItemText primary='Login' />
            <ListItemIcon>
              <IconWrapper type='login' />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <IconWrapper type='menu' fontSize='large' sx={{ color: '#fff' }} />
      </Button>
      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        {userInfo ? DrawerList : LoginDrawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
