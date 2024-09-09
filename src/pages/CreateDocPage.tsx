import React, { useState } from 'react';
import { fetchAPI } from '../services/apiServices';
import PageWrapper from './PageWrapper';
import TextField from '@mui/material/TextField'; // Import TextField from MUI
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface TableCell {
  text: string;
  bold?: boolean;
  underline?: boolean;
}

interface TableRow {
  cells: TableCell[];
}

interface NewDoc {
  title: string;
  documentId: string;
}

export interface TableData {
  title: string;
  clientName: string;
  rows: TableRow[];
}

const defaultTableData = {
  title: '',
  clientName: '',
  rows: [
    {
      cells: [
        { text: '', bold: true, underline: true },
        { text: '', bold: false, underline: false },
        { text: '', bold: false, underline: false },
      ],
    },
  ],
};

const CreateDocPage: React.FC = () => {
  const [tableData, setTableData] = useState<TableData>(defaultTableData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [newDoc, setNewDoc] = useState<NewDoc | null>(null);

  const handleCellChange = (
    rowIndex: number,
    cellIndex: number,
    key: keyof TableCell,
    value: string
  ) => {
    const updatedRows = [...tableData.rows];
    updatedRows[rowIndex].cells[cellIndex][key] = value as never;
    setTableData({ ...tableData, rows: updatedRows });
  };

  const addRow = () => {
    const newRow: TableRow = {
      cells: [
        { text: '', bold: true, underline: true },
        { text: '', bold: false, underline: false },
        { text: '', bold: false, underline: false },
      ],
    };
    setTableData({ ...tableData, rows: [...tableData.rows, newRow] });
  };

  const removeRow = (index: number) => {
    const updatedRows = tableData.rows.filter((_, i) => i !== index);
    setTableData({ ...tableData, rows: updatedRows });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { documentId, title } = await fetchAPI<NewDoc>('/docs/create', {
        method: 'POST',
        body: tableData,
      });

      if (documentId) {
        setNewDoc({ title, documentId });
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setIsSubmitting(false);
      setTableData(defaultTableData);
    }
  };

  if (newDoc) {
    return (
      <PageWrapper>
        <Typography variant='h4' gutterBottom>
          מסמך נוצר בהצלחה
        </Typography>
        <Typography variant='h6' sx={{ direction: 'rtl' }} gutterBottom>
          שם המסמך: {newDoc.title}
        </Typography>
        <Typography variant='h6' sx={{ direction: 'rtl' }} gutterBottom>
          קישור למסמך:
          <Link to={`https://docs.google.com/document/d/${newDoc.documentId}`} target='_blank'>
            לחץ כאן
          </Link>
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setNewDoc(null)}
          sx={{ marginTop: 2 }}
        >
          יצירת מסמך חדש
        </Button>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Typography mt='20px' variant='h4' gutterBottom>
        יצירת מסמך חדש
      </Typography>
      <Box component='form' sx={{ direction: 'rtl' }} onSubmit={handleSubmit}>
        <TextField
          label='שם המסמך'
          variant='outlined'
          fullWidth
          value={tableData.title}
          onChange={(e) => setTableData({ ...tableData, title: e.target.value })}
          required
          margin='normal'
        />

        <TextField
          label='לכבוד'
          variant='outlined'
          fullWidth
          value={tableData.clientName}
          onChange={(e) => setTableData({ ...tableData, clientName: e.target.value })}
          required
          margin='normal'
        />

        {tableData.rows.map((row, rowIndex) => (
          <Box key={rowIndex} sx={{ marginBottom: 2 }}>
            <Typography variant='h6' gutterBottom>
              שורה {rowIndex + 1}
            </Typography>
            <Stack spacing={2}>
              {row.cells.map((cell, cellIndex) => (
                <TextField
                  key={cellIndex}
                  label={cellIndex === 0 ? 'מוצר' : cellIndex === 1 ? 'תיאור' : 'מחיר'}
                  variant='outlined'
                  fullWidth
                  multiline={cellIndex === 1} // Set multiline for the second cell
                  rows={cellIndex === 1 ? 4 : 1} // Set rows for textarea
                  value={cell.text}
                  onChange={(e) => handleCellChange(rowIndex, cellIndex, 'text', e.target.value)}
                  required
                  margin='normal'
                />
              ))}
            </Stack>
            <Button
              color='primary'
              variant='contained'
              onClick={() => removeRow(rowIndex)}
              sx={{ marginTop: 1 }}
            >
              למחוק שורה
            </Button>
          </Box>
        ))}

        <Button variant='outlined' onClick={addRow} sx={{ marginTop: 2, marginLeft: 2 }}>
          הוספת שורה
        </Button>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          disabled={isSubmitting}
          sx={{ marginTop: 2 }}
        >
          {isSubmitting ? 'יוצר מסמך...' : 'יצירת מסמך'}
        </Button>
      </Box>
    </PageWrapper>
  );
};

export default CreateDocPage;
