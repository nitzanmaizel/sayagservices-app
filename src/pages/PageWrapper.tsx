import React from 'react';
import { Container } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: { md: 'calc(100dvh - 86px - 40px)', xs: 'calc(100dvh - 76px - 40px)' },
          width: { xs: '100%', md: '50%' },
        }}
      >
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default PageWrapper;
