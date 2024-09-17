import React, { useState } from 'react';
import PageWrapper from './PageWrapper';
import { Button, TextField, Typography, Stack, CircularProgress } from '@mui/material';
import { useDocs } from '../hooks/useDocs';
import DocsList from '../components/DocList';

const SearchDocPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [createdAfter, setCreatedAfter] = useState<string>('');
  const [createdBefore, setCreatedBefore] = useState<string>('');
  const { searchDocs, searchResults, loading, error, clearSearchResults } = useDocs();

  const handleSearch = () => {
    clearSearchResults();
    if (searchDocs) {
      searchDocs(name, createdAfter, createdBefore);
    }
  };

  return (
    <PageWrapper>
      <Typography variant='h4' gutterBottom>
        חיפוש מסמכים
      </Typography>

      <Stack spacing={2} sx={{ marginBottom: 2, width: { xs: '100%', md: '50%' } }}>
        <TextField
          label='שם המסמך'
          variant='outlined'
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label='נוצר אחרי תאריך (YYYY-MM-DD)'
          type='date'
          variant='outlined'
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          value={createdAfter}
          onChange={(e) => setCreatedAfter(e.target.value)}
        />

        <TextField
          label='נוצר לפני תאריך (YYYY-MM-DD)'
          type='date'
          variant='outlined'
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          value={createdBefore}
          onChange={(e) => setCreatedBefore(e.target.value)}
        />

        <Button variant='contained' color='primary' onClick={handleSearch} disabled={loading}>
          חפש
        </Button>
        <Button variant='outlined' onClick={clearSearchResults} disabled={loading}>
          נקה תוצאות
        </Button>
      </Stack>

      {loading && <CircularProgress />}
      {error && <Typography color='error'>{error}</Typography>}

      {searchResults && searchResults.length > 0 && (
        <>
          <Typography variant='h6' gutterBottom textAlign={'center'}>
            תוצאות חיפוש
          </Typography>
          <DocsList documents={searchResults} />
        </>
      )}
    </PageWrapper>
  );
};

export default SearchDocPage;
