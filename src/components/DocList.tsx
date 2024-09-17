import React from 'react';
import {
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/date';
import { useDocs } from '../hooks/useDocs';

interface Document {
  id: string;
  name: string;
  thumbnailLink: string;
  createdTime: string;
}

interface DocsListProps {
  documents: Document[];
}

const DocsList: React.FC<DocsListProps> = ({ documents }) => {
  const { handleDownload, downloading } = useDocs();

  const matches = useMediaQuery('(min-width:600px)');

  if (!documents.length) {
    return <Typography variant='h3'>No documents found.</Typography>;
  }

  return (
    <ImageList cols={matches ? 3 : 1} gap={20} sx={{ width: '100%' }}>
      {documents.map(({ id, name, thumbnailLink, createdTime }) => (
        <ImageListItem key={thumbnailLink}>
          <img src={thumbnailLink} alt={name} loading='lazy' />
          <Link target='_blank' to={`https://docs.google.com/document/d/${id}`}>
            <Typography textAlign={'center'} variant='subtitle1'>
              {name}
            </Typography>
            <Typography textAlign={'center'} variant='subtitle2'>
              {formatDateTime(createdTime)}
            </Typography>
          </Link>
          <Button color='primary' variant='contained' onClick={() => handleDownload(id, name)}>
            {downloading ? (
              <CircularProgress sx={{ color: '#fff' }} size={20} />
            ) : (
              <Typography sx={{ direction: 'rtl' }}>הורד PDF</Typography>
            )}
          </Button>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default DocsList;
