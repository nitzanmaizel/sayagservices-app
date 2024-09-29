import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchAPI } from '../services/apiServices';
import { getAccessToken, setAccessToken } from '../tokenManager';

type UserInfo = {
  name: string;
  picture: string;
  email: string;
};

type UserContextType = {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const login = useCallback(() => {
    window.location.href = `${API_BASE_URL}/auth/login`;
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    setAccessToken(null);
    navigate('/');
  }, [navigate]);

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

      const data = await fetchAPI<UserInfo>(`/auth/user`);

      setUserInfo({ name: data.name, email: data.email, picture: data.picture });
    } catch (error) {
      setError('Error fetching user info.');
      console.error('Error fetching user info:', error);
      setAccessToken(null);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedAccessToken = getAccessToken();
    console.log({ storedAccessToken });

    if (!storedAccessToken) {
      setLoading(false);
      return;
    }

    setError(null);
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <UserContext.Provider value={{ userInfo, loading, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
