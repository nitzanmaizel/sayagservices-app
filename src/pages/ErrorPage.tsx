import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PageWrapper from './PageWrapper';

const ErrorsText = {
  unauthorized:
    'היי רק משתמשים שהם רשומים כאדמין יכולים להתחבר למערכת, אם אתה חושב שקרתה טעות צור קשר עם הנהלת המערכת',
};

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let errorMessage = (location.state as { message?: string })?.message;
  let statusCode = (location.state as { statusCode?: number })?.statusCode;

  if (location.pathname === '/admin/unauthorized') {
    errorMessage = ErrorsText.unauthorized;
    statusCode = 401;
  }

  const handleGoBack = () => navigate(-1);
  const handleGoHome = () => navigate('/');

  return (
    <PageWrapper>
      <Box sx={{ textAlign: 'center', marginTop: 8, padding: 4 }}>
        <Typography variant='h1' component='h1' gutterBottom>
          {statusCode || 404}
        </Typography>
        {errorMessage ? (
          <Typography variant='h5' component='h2' gutterBottom>
            {errorMessage}
          </Typography>
        ) : (
          <>
            <Typography variant='h5' component='h2' gutterBottom>
              מצטערים, הדף שחיפשת לא נמצא.
            </Typography>
            <Typography variant='body1' gutterBottom>
              יתכן שהדף הוסר, שינה שם, או שהוא אינו זמין זמנית.
            </Typography>
          </>
        )}
        <Box sx={{ marginTop: 4 }}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleGoBack}
            sx={{ marginRight: 2 }}
          >
            חזור אחורה
          </Button>
          <Button variant='outlined' color='primary' onClick={handleGoHome}>
            דף הבית
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default ErrorPage;
