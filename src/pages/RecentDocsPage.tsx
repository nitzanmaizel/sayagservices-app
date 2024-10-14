import React from 'react';
import { CircularProgress } from '@mui/material';
import { useDocs } from '../hooks/useDocs';
import PageWrapper from './PageWrapper';
import DocsList from '../components/DocList';

const RecentDocsPage = () => {
  const { recentDocs, loading, getRecentDocs } = useDocs();

  React.useEffect(() => {
    getRecentDocs();
  }, [getRecentDocs]);

  return (
    <PageWrapper title='מסמכים אחרונים'>
      {loading ? <CircularProgress /> : <DocsList documents={recentDocs} />}
    </PageWrapper>
  );
};

export default RecentDocsPage;
