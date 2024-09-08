import React from 'react';
import {
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useDocs } from '../hooks/useDocs';
import PageWrapper from './PageWrapper';
import { formatDateTime } from '../utils/date';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../services/apiServices';

const RecentDocsPage = () => {
  const [downloading, setDownloading] = React.useState(false);
  const { recentDocs, loading } = useDocs();

  const matches = useMediaQuery('(min-width:600px)');

  const handleDownload = async (documentId: string) => {
    setDownloading(true);
    try {
      // Make an API call to get the PDF file
      const response = await fetchAPI<Blob>(`/docs/${documentId}/download`, {
        method: 'GET',
        responseType: 'blob', // Make sure your fetchAPI supports handling blob responses
      });

      // Create a URL for the blob and download it
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document-${documentId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url); // Clean up the URL object
      setDownloading(false);
    } catch (error) {
      setDownloading(false);
      console.error('Failed to download the document:', error);
    }
  };

  const renderRecentDocs = () => {
    return (
      <ImageList cols={matches ? 3 : 1} gap={20} sx={{ width: '100%' }}>
        {recentDocs.map((doc) => (
          <ImageListItem key={doc.thumbnailLink}>
            <img src={doc.thumbnailLink} alt={doc.name} loading='lazy' />
            <Link target='_blank' to={`https://docs.google.com/document/d/${doc.id}`}>
              <Typography textAlign={'center'} variant='subtitle1'>
                {doc.name}
              </Typography>
              <Typography textAlign={'center'} variant='subtitle2'>
                {formatDateTime(doc.createdTime)}
              </Typography>
            </Link>
            <Button color='primary' variant='contained' onClick={() => handleDownload(doc.id)}>
              {downloading ? (
                <CircularProgress sx={{ color: '#fff' }} size={20} />
              ) : (
                'Download as PDF'
              )}
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
    );
  };

  return (
    <PageWrapper>
      <Typography variant={'h1'} sx={{ fontSize: 'xx-large', margin: '20px 0' }}>
        מסמכים אחרונים
      </Typography>
      {loading ? <CircularProgress /> : renderRecentDocs()}
    </PageWrapper>
  );
};

export default RecentDocsPage;
