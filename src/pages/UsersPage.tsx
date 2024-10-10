import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PageWrapper from './PageWrapper';
import UsersList from '../components/UsersList';
import { useCreateUserMutation } from '../services/userServices';
import { IUser } from '../types/UserTypes';

const UsersPage = () => {
  const userCreateMutation = useCreateUserMutation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateUser = ({ email, name, isAdmin }: Partial<IUser>) => {
    if (!email || !name) return;
    const newUser = { email, name, isAdmin: isAdmin ? true : false };
    userCreateMutation.mutate(newUser);
    handleClose();
  };

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
          onClick={handleClickOpen}
        >
          Add User
        </Button>
      </Box>
      <UsersList />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          sx: { minWidth: 300, p: 0 },
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            handleCreateUser(formJson);
          },
        }}
      >
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField required margin='dense' name='email' label='Email' type='email' fullWidth />
          <TextField required margin='dense' name='name' label='name' type='text' fullWidth />
          <FormControlLabel
            control={<Checkbox id='isAdmin' name='isAdmin' />}
            label='Admin'
            typeof='checkbox'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type='submit'>Create</Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
};

export default UsersPage;
