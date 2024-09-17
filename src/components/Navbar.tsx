import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { AppBar, Avatar, Box } from '@mui/material';
import Sidebar from './Sidebar';

const Navbar: React.FC = () => {
  const { userInfo } = useUser();
  return (
    <AppBar position='sticky' sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Link to='/'>
        <Box
          component='img'
          sx={{ height: 105, marginLeft: 1, maxHeight: { md: 80, xs: 70 } }}
          alt='Sayag Services'
          src='/assets/logo.png'
        />
      </Link>
      <Box display={'flex'}>
        {userInfo && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={userInfo.picture} alt={userInfo.name} />
          </div>
        )}
        <Sidebar />
      </Box>
    </AppBar>
  );
};

export default Navbar;
