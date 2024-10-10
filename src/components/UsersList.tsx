import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box, Paper } from '@mui/material';

import Loader from './Loader';
import IconWrapper from './IconWrapper/IconWrapper';
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUsersQuery,
} from '../services/userServices';
import { IUser } from '../types/UserTypes';
import { useUser } from '../hooks/useUser';
import { useSnackbar } from '../hooks/useSnackbar';

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
    <>
      <TableContainer sx={{ boxShadow: 3 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
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
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='user'>User</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Box display={'flex'}>
                    <IconWrapper
                      isDisabled={userInfo?.email === user.email}
                      onClick={() => handleDelete(user._id!)}
                      type='delete'
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersList;
