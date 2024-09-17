import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useUser } from '../hooks/useUser';

const ProtectedRoute: React.FC = () => {
  const { userInfo, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to='/' replace state={{ from: location }} />;
  }
};

export default ProtectedRoute;
