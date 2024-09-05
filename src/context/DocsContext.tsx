import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { fetchAPI } from '../services/apiServices';
import { useUser } from '../hooks/useUser';

type DocType = {
  createdTime: string;
  id: string;
  mimeType: string;
  name: string;
  thumbnailLink: string;
  webViewLink: string;
};

type UserContextType = {
  recentDocs: DocType[] | [];
  loading: boolean;
  error: string | null;
  getRecentDocs: () => void;
};

export const DocsContext = createContext<UserContextType | undefined>(undefined);

export const DocsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userInfo } = useUser();
  const [recentDocs, setRecentDocs] = useState<DocType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRecentDocs = useCallback(async () => {
    try {
      setLoading(true);
      const recentDocsRes = await fetchAPI<DocType[]>('/docs/recent');

      if (recentDocsRes.length) {
        setRecentDocs(recentDocsRes);
      }
      setLoading(false);
    } catch (error) {
      setError(`Error fetching recent documents. ${error}`);
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (userInfo) {
      getRecentDocs();
    }
  }, [userInfo, getRecentDocs]);

  return (
    <DocsContext.Provider value={{ recentDocs, loading, error, getRecentDocs }}>
      {children}
    </DocsContext.Provider>
  );
};
