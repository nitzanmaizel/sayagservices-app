import React from 'react';
import { Container } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: { md: 'calc(100dvh - 86px - 40px)', xs: 'calc(100dvh - 76px - 40px)' },
        }}
      >
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default PageWrapper;
