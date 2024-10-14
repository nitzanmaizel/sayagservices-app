import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';

import { useCreateUserMutation } from '../../services/userServices';
import { IUser } from '../../types/UserTypes';

const UsersModal = () => {
  const userCreateMutation = useCreateUserMutation();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateUser = ({ email, name, isAdmin }: Partial<IUser>) => {
    if (!email || !name) return;
    const newUser = { email, name, isAdmin: isAdmin ? true : false, googleId: '' };
    userCreateMutation.mutate(newUser);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        הוסף משתמש חדש
      </Button>
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
        <DialogTitle>{'צור משתמש'}</DialogTitle>
        <DialogContent>
          <TextField required margin='dense' name='email' label='אימייל' type='email' fullWidth />
          <TextField required margin='dense' name='name' label='שם' type='text' fullWidth />
          <FormControlLabel
            control={<Checkbox id='isAdmin' name='isAdmin' />}
            label='אדמין'
            typeof='checkbox'
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>
            {'ביטול'}
          </Button>
          <Button variant='contained' color='primary' type='submit'>
            {'הוסף משתמש'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default UsersModal;
