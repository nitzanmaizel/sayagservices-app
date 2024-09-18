import React from 'react';
import { ImageList, Typography, useMediaQuery } from '@mui/material';

import DocCard from './DocCard';
import { Document } from '../types/doc';

interface DocsListProps {
  documents: Document[];
}

const DocsList: React.FC<DocsListProps> = ({ documents }) => {
  const matches = useMediaQuery('(min-width:600px)');

  if (!documents.length) {
    return <Typography variant='h3'>No documents found.</Typography>;
  }

  return (
    <ImageList cols={matches ? 3 : 1} gap={20} sx={{ width: '100%' }}>
      {documents.map((doc) => (
        <DocCard {...doc} />
      ))}
    </ImageList>
  );
};

export default DocsList;
