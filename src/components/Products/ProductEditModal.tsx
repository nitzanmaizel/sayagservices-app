import React, { ChangeEvent, FormEvent } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { TextField, Button, Box } from '@mui/material';

import IconWrapper from '../IconWrapper/IconWrapper';
import { IProduct } from '../../types/ProductTypes';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useUpdateProductMutation } from '../../services/productServices';
import { isValidNumber } from '../../utils/date';

interface ProductEditModalProps {
  productToEdit: Partial<IProduct>;
}

const ProductEditModal = ({ productToEdit }: ProductEditModalProps) => {
  const { showSnackbar } = useSnackbar();
  const productUpdateMutation = useUpdateProductMutation();

  const [product, setProduct] = React.useState<Partial<IProduct>>(productToEdit);
  const [imagePreview, setImagePreview] = React.useState<string | undefined>(product?.imageUrl);
  const [isOpen, setIsOpen] = React.useState(false);

  const modalFields = getFields(product as IProduct);

  React.useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const renderImageUpload = () => (
    <React.Fragment>
      <Button variant='outlined' color='primary' component='label'>
        Upload Image
        <input type='file' hidden accept='image/*' name='image' onChange={handleImageChange} />
      </Button>
      {imagePreview && (
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={imagePreview}
            alt='Image Preview'
            style={{ maxWidth: '100%', maxHeight: 300 }}
          />
        </Box>
      )}
    </React.Fragment>
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const selectedImage = target.files[0];
      setProduct((prev) => ({ ...prev, image: selectedImage }));
      const previewURL = URL.createObjectURL(selectedImage);
      setImagePreview(previewURL);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!product.name || !product.description || !product.price) return;

    if (!isValidNumber(product.price)) {
      showSnackbar('Price must be a valid number', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    if (product.image) formData.append('image', product.image);

    productUpdateMutation.mutate({ productId: product._id!, formData });
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <IconWrapper type='edit' onClick={() => setIsOpen(true)} />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth='sm'>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {modalFields.map(({ name, value, label, ...rest }) => (
            <TextField
              key={name}
              name={name}
              value={value}
              label={label}
              onChange={handleChange}
              fullWidth
              margin='dense'
              {...rest}
            />
          ))}
          {renderImageUpload()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProductEditModal;

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

const getFields = (product: IProduct): FieldConfig[] => [
  {
    label: 'Name',
    name: 'name',
    value: product.name || '',
    multiline: false,
    type: 'text',
    required: true,
  },
  {
    label: 'Description',
    name: 'description',
    value: product.description || '',
    multiline: true,
    rows: 4,
    type: 'text',
  },
  {
    label: 'Price',
    name: 'price',
    value: product.price || '',
    multiline: false,
    type: 'text',
  },
];
