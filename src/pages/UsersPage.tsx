import { Box, Button, Typography } from '@mui/material';
import PageWrapper from './PageWrapper';
import UsersList from '../components/UsersList';

const UsersPage = () => {
  return (
    <PageWrapper>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography my={3} variant='h4' textAlign={'center'}>
          Users List
        </Typography>
        <Button
          sx={{ height: 40, alignSelf: 'center', textTransform: 'capitalize' }}
          variant='contained'
          color='primary'
        >
          Add User
        </Button>
      </Box>
      <UsersList />
    </PageWrapper>
  );
};

export default UsersPage;
