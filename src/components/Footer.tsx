import { Box } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Box component={'footer'} display={'flex'} justifyContent={'center'}>
      <p>&copy; 2024 Sayag Services</p>
    </Box>
  );
};

export default Footer;
