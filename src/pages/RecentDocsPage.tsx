import React from 'react';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import PageWrapper from './PageWrapper';
import DocsList from '../components/DocList';
import DocSkeleton from '../components/Skeletons/DocSkeleton';
import { useDocs } from '../hooks/useDocs';

const RecentDocsPage = () => {
  const { recentDocs, loading, getRecentDocs } = useDocs();
  const matches = useMediaQuery('(min-width:600px)');

  React.useEffect(() => {
    getRecentDocs();
  }, [getRecentDocs]);

  if (loading) {
    return (
      <PageWrapper title='מסמכים אחרונים'>
        <ImageList cols={matches ? 3 : 1} gap={20} sx={{ width: '100%' }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <ImageListItem key={index}>
              <DocSkeleton />
            </ImageListItem>
          ))}
        </ImageList>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title='מסמכים אחרונים'>
      <DocsList documents={recentDocs} />
    </PageWrapper>
  );
};

export default RecentDocsPage;
