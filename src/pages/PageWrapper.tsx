import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  trigger?: React.ReactNode;
}

const PageWrapper = ({ children, title, trigger }: PageWrapperProps) => {
  return (
    <Box position={'relative'}>
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
          <Box position={'relative'}>
            <Typography variant='h4' align='center' mt={3}>
              {title}
            </Typography>
            {trigger && <Box>{trigger}</Box>}
          </Box>
        )}
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default PageWrapper;
