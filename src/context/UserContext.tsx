import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchAPI } from '../services/apiServices';
import { getAccessToken, setAccessToken } from '../tokenManager';
import { API_LOGIN, API_USER } from '../types/ApiTypes';

type UserInfo = {
  name: string;
  picture: string;
  email: string;
  isAdmin?: boolean;
};

type UserContextType = {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  createAdminUser: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const login = useCallback(() => {
    window.location.href = API_LOGIN;
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    setAccessToken(null);
    navigate('/');
  }, [navigate]);

  const createAdminUser = useCallback(async () => {
    try {
      await fetchAPI('/user', { method: 'POST' });
    } catch (error) {
      setError(`Error creating admin user, ${error}`);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get('token');

    if (urlToken) {
      setAccessToken(urlToken);
      window.history.replaceState({}, document.title, location.pathname);
    } else {
      setLoading(false);
    }
  }, [location]);

  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { name, email, picture, isAdmin } = await fetchAPI<UserInfo>(API_USER);

      setUserInfo({ name, email, picture, isAdmin });
    } catch (error) {
      setError(`Error fetching user info, ${error}`);
      setAccessToken(null);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedAccessToken = getAccessToken();
    if (!storedAccessToken) return setLoading(false);
    setError(null);
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <UserContext.Provider value={{ userInfo, loading, error, login, logout, createAdminUser }}>
      {children}
    </UserContext.Provider>
  );
};
