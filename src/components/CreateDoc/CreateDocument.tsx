import React, { useState } from 'react';
import { fetchAPI } from '../../services/apiServices';

// Define the structure for cell and row data
interface TableCell {
  text: string;
  bold?: boolean;
  underline?: boolean;
}

interface TableRow {
  cells: TableCell[];
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

const CreateDocument: React.FC = () => {
  const [tableData, setTableData] = useState<TableData>(defaultTableData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      await fetchAPI('/docs/create', { method: 'POST', body: tableData });
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setIsSubmitting(false);
      setTableData(defaultTableData);
    }
  };

  return (
    <div className='container'>
      <h1>Create a New Document</h1>
      <form style={{ direction: 'rtl' }} onSubmit={handleSubmit}>
        <label htmlFor='title'>שם המסמך:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={tableData.title}
          onChange={(e) => setTableData({ ...tableData, title: e.target.value })}
          required
        />

        <label htmlFor='tableTitle'>לכבוד:</label>
        <input
          type='text'
          id='tableTitle'
          name='tableTitle'
          value={tableData.clientName}
          onChange={(e) => setTableData({ ...tableData, clientName: e.target.value })}
          required
        />

        {tableData.rows.map((row, rowIndex) => (
          <div key={rowIndex} className='table-row'>
            <h3>שורה {rowIndex + 1}</h3>
            {row.cells.map((cell, cellIndex) => (
              <div key={cellIndex}>
                <label htmlFor={`row${rowIndex + 1}cell${cellIndex + 1}`}>
                  {cellIndex === 0 ? 'מוצר:' : cellIndex === 1 ? 'תיאור:' : 'מחיר:'}
                </label>
                <textarea
                  rows={4}
                  name={`rows[${rowIndex}][${cellIndex}]`}
                  value={cell.text}
                  onChange={(e) => handleCellChange(rowIndex, cellIndex, 'text', e.target.value)}
                  required
                ></textarea>
              </div>
            ))}
            <button type='button' onClick={() => removeRow(rowIndex)}>
              למחוק שורה
            </button>
          </div>
        ))}

        <button type='button' onClick={addRow}>
          הוספת שורה
        </button>
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'יוצר מסמך...' : 'יצירת מסמך'}
        </button>
      </form>
    </div>
  );
};

export default CreateDocument;
