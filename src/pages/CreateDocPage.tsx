import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import PageWrapper from './PageWrapper';
import { fetchAPI } from '../services/apiServices';
import { TableData, NewDoc, TableCell, TableRow } from '../types/table';

const CreateDocPage: React.FC = () => {
  const [tableData, setTableData] = useState<TableData>(defaultTableData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

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
      const { documentId = '', title } = await fetchAPI<NewDoc>('/docs/create', {
        method: 'POST',
        body: tableData,
      });

      if (documentId) {
        navigate('/new', { state: { title, documentId } });
      }
    } catch (error) {
      console.error('Error during form submission:', error);

      navigate('/error', {
        state: {
          message: 'אירעה שגיאה בעת יצירת המסמך. אנא נסה שוב מאוחר יותר.',
          statusCode: 400,
        },
      });
    } finally {
      setIsSubmitting(false);
      setTableData(defaultTableData);
    }
  };

  return (
    <PageWrapper title='יצירת מסמך חדש'>
      <Box
        component='form'
        sx={{ maxWidth: '600px', minWidth: 'auto', p: '10px' }}
        onSubmit={handleSubmit}
      >
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
            <Typography variant='h6' gutterBottom textAlign={'center'}>
              שורה {rowIndex + 1}
            </Typography>
            <Stack spacing={2}>
              {row.cells.map((cell, cellIndex) => (
                <TextField
                  key={cellIndex}
                  label={cellIndex === 0 ? 'מוצר' : cellIndex === 1 ? 'תיאור' : 'מחיר'}
                  variant='outlined'
                  fullWidth
                  multiline={cellIndex === 1}
                  rows={cellIndex === 1 ? 4 : 1}
                  value={cell.text}
                  onChange={(e) => handleCellChange(rowIndex, cellIndex, 'text', e.target.value)}
                  required
                  margin='normal'
                />
              ))}
            </Stack>
            <Button
              sx={{ mt: 1 }}
              color='primary'
              variant='contained'
              onClick={() => removeRow(rowIndex)}
            >
              למחוק שורה
            </Button>
          </Box>
        ))}

        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button variant='outlined' onClick={addRow} sx={{ mr: 2 }}>
            הוספת שורה
          </Button>
          <Button variant='contained' color='primary' type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'יוצר מסמך...' : 'יצירת מסמך'}
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default CreateDocPage;

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
