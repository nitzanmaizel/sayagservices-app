import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useUser } from '../hooks/useUser';

const ProtectedRoute: React.FC = () => {
  const { loading, userInfo } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!userInfo) {
    return <Navigate to='/' replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
