import { Box } from '@mui/material';
import React from 'react';
import Loader from '../components/Loader';

const LoadingAppPage: React.FC = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
    >
      <img src='/assets/logo.png' alt='logo' height={200} width={200} />
      <Loader />
    </Box>
  );
};

export default LoadingAppPage;
