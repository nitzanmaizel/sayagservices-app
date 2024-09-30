import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { fetchAPI } from '../services/apiServices';
import { API_DOCS_DOWNLOAD, API_DOCS_RECENT, API_DOCS_SEARCH } from '../types/ApiTypes';

type DocType = {
  createdTime: string;
  id: string;
  mimeType: string;
  name: string;
  thumbnailLink: string;
  webViewLink: string;
};

type DocsContextType = {
  recentDocs: DocType[] | [];
  searchResults: DocType[] | [];
  loading: boolean;
  downloading: boolean;
  error: string | null;
  getRecentDocs: () => void;
  searchDocs: (name?: string, createdAfter?: string, createdBefore?: string) => void;
  clearSearchResults: () => void;
  handleDownload: (docId: string, docTitle: string) => Promise<void>;
};

export const DocsContext = createContext<DocsContextType | undefined>(undefined);

export const DocsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recentDocs, setRecentDocs] = useState<DocType[] | []>([]);
  const [searchResults, setSearchResults] = useState<DocType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRecentDocs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const recentDocsRes = await fetchAPI<DocType[]>(API_DOCS_RECENT);

      if (recentDocsRes.length) {
        setRecentDocs(recentDocsRes);
      }
      setLoading(false);
    } catch (error) {
      setError(`Error fetching recent documents. ${error}`);
      setLoading(false);
    }
  }, []);

  const searchDocs = useCallback(
    async (name?: string, createdAfter?: string, createdBefore?: string) => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams();

        if (name) queryParams.append('name', name);
        if (createdAfter) queryParams.append('createdAfter', createdAfter);
        if (createdBefore) queryParams.append('createdBefore', createdBefore);

        const res = await fetchAPI<DocType[]>(`${API_DOCS_SEARCH}?${queryParams.toString()}`);

        setSearchResults(res);
        setLoading(false);
      } catch (error) {
        setError(`Error searching documents. ${error}`);
        setLoading(false);
      }
    },
    []
  );

  const handleDownload = useCallback(async (docId: string, docTitle: string) => {
    setDownloading(true);
    try {
      const response = await fetchAPI<Blob>(`${API_DOCS_DOWNLOAD}/${docId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${docTitle}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      setDownloading(false);
    } catch (error) {
      setDownloading(false);
      console.error('Failed to download the document:', error);
    }
  }, []);

  const clearSearchResults = useCallback(() => {
    setSearchResults([]);
  }, []);

  return (
    <DocsContext.Provider
      value={{
        recentDocs,
        searchResults,
        loading,
        downloading,
        error,
        getRecentDocs,
        searchDocs,
        clearSearchResults,
        handleDownload,
      }}
    >
      {children}
    </DocsContext.Provider>
  );
};
