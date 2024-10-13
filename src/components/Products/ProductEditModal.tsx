import React from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { TextField, Button, CardMedia, Input, InputLabel } from '@mui/material';
import { IProduct } from '../../types/ProductTypes';

interface ProductEditModalProps {
  isOpen: boolean;
  editedProduct: Partial<IProduct>;
  handleClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
}

const ProductEditModal = ({
  isOpen,
  editedProduct,
  handleClose,
  handleChange,
  handleSave,
}: ProductEditModalProps) => {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | undefined>(
    editedProduct.imageUrl
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const onSave = () => {
    console.log('Edited Product:', editedProduct);
    console.log('Selected Image File:', imageFile);

    if (imageFile && imagePreviewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    handleSave();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          label='Name'
          name='name'
          value={editedProduct.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin='dense'
          label='Description'
          name='description'
          value={editedProduct.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />
        <TextField
          margin='dense'
          label='Price'
          name='price'
          value={editedProduct.price}
          onChange={handleChange}
          type='number'
          fullWidth
        />
        <TextField
          margin='dense'
          label='Image URL'
          name='imageUrl'
          value={editedProduct.imageUrl}
          onChange={handleChange}
          fullWidth
          disabled
        />
        <InputLabel sx={{ mt: 2 }}>Upload New Image</InputLabel>
        <Input
          type='file'
          inputProps={{ accept: 'image/*' }}
          onChange={handleImageChange}
          fullWidth
        />

        {imagePreviewUrl && (
          <CardMedia
            component='img'
            height='200'
            image={imagePreviewUrl}
            alt='Image Preview'
            sx={{ borderRadius: 1, mt: 2 }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSave} variant='contained' color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEditModal;
