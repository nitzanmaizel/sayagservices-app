import React from 'react';
import { Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
}

const PageWrapper = ({ children, title }: PageWrapperProps) => {
  return (
    <div>
      <Navbar />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: { md: 'calc(100dvh - 86px - 40px)', xs: 'calc(100dvh - 76px - 40px)' },
          width: { xs: '100%', md: '100%' },
        }}
      >
        {title && (
          <Typography variant='h4' align='center' mt={3} mb={3}>
            {title}
          </Typography>
        )}
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default PageWrapper;
