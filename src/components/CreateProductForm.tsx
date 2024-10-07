import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useProduct } from '../hooks/useProduct';
import { useSnackbar } from '../hooks/useSnackbar';
import { isValidNumber } from '../utils/date';

interface FormState {
  name: string;
  description: string;
  price: number | '';
  image: File | null;
}

const CreateProductForm: React.FC = () => {
  const { createProduct } = useProduct();
  const { showSnackbar } = useSnackbar();

  const [formState, setFormState] = useState<FormState>({
    name: '',
    description: '',
    price: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'image') {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const selectedImage = target.files[0];
        setFormState((prev) => ({ ...prev, image: selectedImage }));

        const previewURL = URL.createObjectURL(selectedImage);
        setImagePreview(previewURL);
      }
    } else if (name === 'price') {
      const numericValue = value === '' ? '' : Number(value);
      if (isValidNumber(numericValue)) {
        setFormState((prev) => ({ ...prev, price: numericValue }));
      }
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { name, description, price } = formState;

    if (!name || !description || price === '') {
      const errorMessage = 'Please fill in all required fields.';
      showSnackbar(errorMessage, 'error');
      setLoading(false);
      return;
    }

    const numericPrice = price as number;

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', numericPrice.toString());
      if (formState.image) {
        formData.append('image', formState.image);
      }

      await createProduct(formData);

      const successMessage = 'Product created successfully!';
      showSnackbar(successMessage, 'success');
      setFormState({ name: '', description: '', price: '', image: null });
      setImagePreview(null);
    } catch (err: unknown) {
      let errorMessage = 'An unexpected error occurred.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 3,
        mt: 5,
      }}
      noValidate
      encType='multipart/form-data'
    >
      <Typography variant='h5' component='h1' textAlign='center'>
        Create New Product
      </Typography>
      <TextField
        name='name'
        label='Product Name'
        variant='outlined'
        required
        value={formState.name}
        onChange={handleChange}
      />
      <TextField
        name='description'
        label='Description'
        variant='outlined'
        required
        multiline
        rows={4}
        value={formState.description}
        onChange={handleChange}
      />
      <TextField
        name='price'
        label='Price'
        variant='outlined'
        required
        type='number'
        value={formState.price}
        onChange={handleChange}
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
      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? 'Uploading...' : 'Create Product'}
      </Button>
    </Box>
  );
};

export default CreateProductForm;
