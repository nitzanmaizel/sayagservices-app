import React, { ChangeEvent, FormEvent } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { TextField, Button, Box } from '@mui/material';

import IconWrapper from '../IconWrapper/IconWrapper';
import { isValidNumber } from '../../utils/date';
import { IProduct } from '../../types/ProductTypes';
import { useUpdateProductMutation } from '../../services/productServices';

interface ProductEditModalProps {
  productToEdit: Partial<IProduct>;
}

const ProductEditModal = ({ productToEdit }: ProductEditModalProps) => {
  const productUpdateMutation = useUpdateProductMutation();

  const [product, setProduct] = React.useState<Partial<IProduct>>(productToEdit);
  const [imagePreview, setImagePreview] = React.useState<string | undefined>(product?.imageUrl);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'image') {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const selectedImage = target.files[0];
        setProduct((prev) => ({ ...prev, image: selectedImage }));

        const previewURL = URL.createObjectURL(selectedImage);
        setImagePreview(previewURL);
      }
    } else if (name === 'price') {
      const numericValue = value === '' ? '' : Number(value);
      if (isValidNumber(numericValue)) {
        setProduct((prev) => ({ ...prev, price: numericValue }));
      }
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!product.name || !product.description || !product.price) return;

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());

    if (product.image) {
      formData.append('image', product.image);
    }

    productUpdateMutation.mutate({ productId: product._id!, formData });

    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <IconWrapper type='edit' onClick={() => setIsOpen(true)} />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth='sm'>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Name'
            name='name'
            value={product.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin='dense'
            label='Description'
            name='description'
            value={product.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            margin='dense'
            label='Price'
            name='price'
            value={product.price}
            onChange={handleChange}
            type='number'
            fullWidth
          />
          <Button variant='outlined' color='primary' component='label'>
            Upload Image
            <input type='file' hidden accept='image/*' name='image' onChange={handleChange} />
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
