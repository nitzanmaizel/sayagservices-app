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

const GoogleScopes = import.meta.env.VITE_GOOGLE_AUTH_SCOPE;

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        setLoading(true);
        setError(null);

        const accessToken = tokenResponse.access_token;
        localStorage.setItem('accessToken', accessToken);

        await fetchUserInfo(accessToken);
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
      localStorage.removeItem('accessToken');
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (!storedAccessToken) {
      // No token, set loading to false
      setLoading(false);
      return;
    }

    setError(null);
    fetchUserInfo(storedAccessToken);
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, loading, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
