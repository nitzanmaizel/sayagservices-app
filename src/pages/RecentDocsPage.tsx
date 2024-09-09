import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useDocs } from '../hooks/useDocs';
import PageWrapper from './PageWrapper';
import DocsList from '../components/DocList/DocList';

const RecentDocsPage = () => {
  const { recentDocs, loading, getRecentDocs } = useDocs();

  React.useEffect(() => {
    getRecentDocs();
  }, [getRecentDocs]);

  return (
    <PageWrapper>
      <Typography variant={'h1'} sx={{ fontSize: 'xx-large', margin: '20px 0' }}>
        מסמכים אחרונים
      </Typography>
      {loading ? <CircularProgress /> : <DocsList documents={recentDocs} />}
    </PageWrapper>
  );
};

export default RecentDocsPage;
