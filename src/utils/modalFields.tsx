import { IProduct } from '../types/ProductTypes';

interface FieldConfig {
  label: string;
  name: string;
  value: string | number;
  type: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  [key: string]: any;
}

export const getFields = (product: Partial<IProduct>): FieldConfig[] => [
  {
    label: 'שם',
    name: 'name',
    value: product.name || '',
    multiline: false,
    type: 'text',
    required: true,
  },
  {
    label: 'תיאור',
    name: 'description',
    value: product.description || '',
    multiline: true,
    rows: 4,
    type: 'text',
  },
  {
    label: 'מחיר',
    name: 'price',
    value: product.price || '',
    multiline: false,
    type: 'number',
    required: true,
  },
];
