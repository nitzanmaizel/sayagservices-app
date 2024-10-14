import { Box, TextField, Button, Typography } from '@mui/material';

export const ContactUsForm = () => {
  return (
    <Box
      component='form'
      sx={{
        maxWidth: 500,
        margin: '20px auto',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: 5,
      }}
      noValidate
      autoComplete='off'
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <Typography variant='h4' align='center' gutterBottom>
        {'צור קשר'}
      </Typography>

      <TextField required label='שם' variant='outlined' fullWidth />
      <TextField required label='אימייל' variant='outlined' type='email' fullWidth />
      <TextField label='נושא' variant='outlined' fullWidth />
      <TextField required label='תיאור' variant='outlined' multiline rows={4} fullWidth />

      <Button variant='contained' color='primary' type='submit'>
        {'שלח'}
      </Button>
    </Box>
  );
};

export default ContactUsForm;
