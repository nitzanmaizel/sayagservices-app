import React, { ChangeEvent, FormEvent } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { Button, TextField, Box } from '@mui/material';
import { useSnackbar } from '../../hooks/useSnackbar';
import { IProduct } from '../../types/ProductTypes';
import { isValidNumber } from '../../utils/date';
import { useCreateProductMutation } from '../../services/productServices';

const emptyProduct: Partial<IProduct> = {
  name: '',
  description: '',
  price: 0,
  image: null,
};

const ProductCreateModal = () => {
  const { showSnackbar } = useSnackbar();
  const productCreateMutation = useCreateProductMutation();

  const [open, setOpen] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<string | undefined>('');
  const [product, setProduct] = React.useState<Partial<IProduct>>(emptyProduct);

  React.useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const modalFields = getFields(product as IProduct);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const selectedImage = target.files[0];
      setProduct((prev) => ({ ...prev, image: selectedImage }));
      const previewURL = URL.createObjectURL(selectedImage);
      setProduct((prev) => ({ ...prev, imageUrl: previewURL }));
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
    formData.append('imageUrl', product.imageUrl || '');
    if (product.image) formData.append('image', product.image);

    productCreateMutation.mutate(formData);

    setProduct(emptyProduct);
    setOpen(false);
  };

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

  return (
    <React.Fragment>
      <Button
        sx={{ height: 40, alignSelf: 'center', textTransform: 'capitalize' }}
        variant='contained'
        color='primary'
        onClick={() => setOpen(true)}
      >
        Create Product
      </Button>
      <Dialog open={open}>
        <DialogTitle>Create Product</DialogTitle>
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProductCreateModal;

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
