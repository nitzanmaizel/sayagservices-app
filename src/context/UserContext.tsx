import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useGoogleLogin, googleLogout, TokenResponse } from '@react-oauth/google';
import { fetchAPI } from '../services/apiServices';

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

const accessToken = localStorage.getItem('accessToken');

const GoogleScopes = import.meta.env.VITE_GOOGLE_AUTH_SCOPE;

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        setLoading(true);
        setError(null);

        localStorage.setItem('accessToken', tokenResponse.access_token);

        await fetchUserInfo(tokenResponse.access_token);
      } catch (error) {
        setError('Error during authentication.');
        console.error('Error authenticating user:', error);
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Login Failed'),
    scope: GoogleScopes,
    prompt: 'consent',
  });

  // Function to trigger the login flow
  const login = useCallback(() => {
    handleGoogleLogin();
  }, [handleGoogleLogin]);

  const logout = useCallback(() => {
    setUserInfo(null);
    localStorage.removeItem('accessToken');
    googleLogout();
  }, []);

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const { name, picture, email } = await fetchAPI<UserInfo>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { access_token: accessToken },
      });

      setUserInfo({ name, picture, email });
    } catch (error) {
      setError('Error fetching user info.');
      console.error('Error fetching user info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);
    fetchUserInfo(accessToken);
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, loading, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
