import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { TextField, Button, Box } from '@mui/material';

import IconWrapper from '../IconWrapper/IconWrapper';
import { IProduct } from '../../types/ProductTypes';
import { isValidNumber } from '../../utils/date';
import { useSnackbar } from '../../hooks/useSnackbar';
import { getFields } from '../../utils/modalFields';
import { useCreateProductMutation, useUpdateProductMutation } from '../../services/productServices';

interface ProductModalProps {
  mode: 'create' | 'edit';
  initialProduct?: Partial<IProduct>;
}

const ProductModal: React.FC<ProductModalProps> = ({ mode, initialProduct = {} }) => {
  const { showSnackbar } = useSnackbar();
  const productCreateMutation = useCreateProductMutation();
  const productUpdateMutation = useUpdateProductMutation();

  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState<Partial<IProduct>>(initialProduct);
  const [imagePreview, setImagePreview] = React.useState<string | undefined>(
    initialProduct.imageUrl
  );
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  useEffect(() => {
    setProduct(initialProduct);
    setImagePreview(initialProduct.imageUrl);
    setErrors({});
  }, [initialProduct]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
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

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!product.name) newErrors.name = 'Name is required';
    if (!product.description) newErrors.description = 'Description is required';
    if (product.price === undefined || product.price === null) {
      newErrors.price = 'Price is required';
    } else if (!isValidNumber(product.price)) {
      newErrors.price = 'Price must be a valid number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('name', product.name as string);
    formData.append('description', product.description as string);
    formData.append('price', product.price!.toString());

    if (product.image) {
      formData.append('image', product.image);
    }

    if (mode === 'create') {
      handleCreate(formData);
    } else if (mode === 'edit') {
      handleEdit(formData, product._id);
    }

    setProduct({});
    setImagePreview(undefined);
    setErrors({});
    setOpen(false);
  };

  const handleCreate = (formData: FormData) => {
    productCreateMutation.mutate(formData);
  };

  const handleEdit = (formData: FormData, productId?: string) => {
    if (!productId) {
      showSnackbar('Product ID is missing', 'error');
      return;
    }
    productUpdateMutation.mutate({ productId, formData });
  };

  const fields = getFields(product);

  const renderTriggerButton = () => {
    if (mode === 'create') {
      return (
        <IconWrapper
          type='add'
          text='Create Product'
          onClick={() => setOpen(true)}
          buttonSx={{ border: '1px solid #000' }}
        />
      );
    } else if (mode === 'edit') {
      return <IconWrapper type='edit' onClick={() => setOpen(true)} />;
    }
  };

  return (
    <>
      {renderTriggerButton()}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
        <DialogTitle>{mode === 'create' ? 'Create Product' : 'Edit Product'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            {fields.map(({ name, value, label, ...rest }) => (
              <TextField
                key={name}
                name={name}
                value={value}
                label={label}
                onChange={handleChange}
                fullWidth
                margin='dense'
                {...rest}
                error={Boolean(errors[name])}
                helperText={errors[name] || ''}
              />
            ))}
            <Box sx={{ mt: 2 }}>
              <Button variant='outlined' color='primary' component='label'>
                Upload Image
                <input
                  type='file'
                  hidden
                  accept='image/*'
                  name='image'
                  onChange={handleImageChange}
                />
              </Button>
              {imagePreview && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <img
                    src={imagePreview}
                    alt='Image Preview'
                    style={{ maxWidth: '100%', maxHeight: 300 }}
                  />
                </Box>
              )}
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant='contained' color='primary' type='submit'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductModal;
