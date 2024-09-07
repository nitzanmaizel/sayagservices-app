import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Box, Container } from '@mui/material';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Container
        sx={{
          minHeight: { md: 'calc(100vh - 86px - 40px)', xs: 'calc(100vh - 76px - 40px)' },
        }}
      >
        {children}
      </Container>
      <Box component={'footer'} display={'flex'} justifyContent={'center'}>
        <p>&copy; 2024 Sayag Services</p>
      </Box>
    </div>
  );
};

export default PageWrapper;
