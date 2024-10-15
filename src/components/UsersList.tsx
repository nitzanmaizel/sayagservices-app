import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box, Paper } from '@mui/material';

import Loader from './Loader';
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUsersQuery,
} from '../services/userServices';
import { IUser } from '../types/UserTypes';
import { useUser } from '../hooks/useUser';
import { useSnackbar } from '../hooks/useSnackbar';
import AreYouSureModal from './Modals/AreYouSureModal';

const UsersList: React.FC = () => {
  const { userInfo } = useUser();
  const { showSnackbar } = useSnackbar();

  const usersQuery = useUsersQuery();
  const userUpdateMutation = useUpdateUserMutation();
  const userDeleteMutation = useDeleteUserMutation();

  const handleDelete = (userId: string) => {
    if (userInfo?.email === usersQuery.data?.users.find((user) => user._id === userId)?.email) {
      return showSnackbar('You cannot delete yourself', 'error');
    }
    userDeleteMutation.mutate(userId);
  };

  const handleRollChange = (event: SelectChangeEvent, user: IUser) => {
    if (userInfo?.email === user.email) {
      return showSnackbar('You cannot change your own role', 'error');
    }
    const role = event.target.value;
    const updatedUser = { ...user, isAdmin: role === 'admin' };
    userUpdateMutation.mutate(updatedUser);
  };

  if (usersQuery.isLoading) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        <Loader size={40} />
      </Box>
    );
  }

  if (usersQuery.isError) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        Error: {usersQuery.error.message}
      </Box>
    );
  }

  return (
    <React.Fragment>
      <TableContainer sx={{ boxShadow: 3, marginTop: 1 }} component={Paper}>
        <Table sx={{ 'td, th': { whiteSpace: 'nowrap' } }}>
          <TableHead>
            <TableRow>
              <TableCell>{'שם'}</TableCell>
              <TableCell>{'אימייל'}</TableCell>
              <TableCell>{'תפקיד'}</TableCell>
              <TableCell>{'פעולות'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersQuery.data?.users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    disabled={userInfo?.email === user.email}
                    id='role'
                    value={user?.isAdmin ? 'admin' : 'user'}
                    name='role'
                    onChange={(e: SelectChangeEvent) => handleRollChange(e, user)}
                  >
                    <MenuItem value='admin'>{'אדמין'}</MenuItem>
                    <MenuItem value='user'>{'משתמש'}</MenuItem>
                  </Select>
                </TableCell>
                <TableCell
                  sx={{
                    '& .MuiBox-root': {
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: 1,
                      padding: '6px 8px',
                    },
                  }}
                >
                  <AreYouSureModal
                    disabled={userInfo?.email === user.email}
                    item='משתמש'
                    handleDelete={() => handleDelete(user._id!)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default UsersList;
