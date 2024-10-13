import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import PageWrapper from './PageWrapper';

const GOOGLE_DOCS_URL = 'https://docs.google.com/document/d/';

const NewDocPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { title, documentId } = state;

  if (!title || !documentId) {
    navigate('/create');
  }

  return (
    <PageWrapper>
      <Typography variant='h4' gutterBottom>
        מסמך נוצר בהצלחה
      </Typography>
      <Typography variant='h6' sx={{ direction: 'rtl' }} gutterBottom>
        שם המסמך: {title}
      </Typography>
      <Typography variant='h6' sx={{ direction: 'rtl' }} gutterBottom>
        קישור למסמך:{' '}
        <Link to={`${GOOGLE_DOCS_URL}${documentId}`} target='_blank'>
          לחץ כאן
        </Link>
      </Typography>

      <Typography textAlign='center' variant='h6'>
        תוכל למצוא את המסמך בדף של <Link to='/recent'>המסמכים האחרונים</Link> שלך
      </Typography>
      <Typography textAlign='center' variant='body1' sx={{ direction: 'rtl' }}>
        *שים לב בגלל שמסמך חדש התמונה של המסמך תראה ריקה אתה עדין יכול לפתוח אותו ולהוריד אותו כPDF
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate('/create')}
        sx={{ marginTop: 2 }}
      >
        יצירת מסמך חדש
      </Button>
    </PageWrapper>
  );
};

export default NewDocPage;
