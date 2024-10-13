import React from 'react';
import { Box } from '@mui/material';
import Loader from '../Loader';
import ProductItem from './ProductItem';
import ProductEditModal from './ProductEditModal';
import { useProductsQuery } from '../../services/productServices';
import { IProduct } from '../../types/ProductTypes';

const ProductsList = () => {
  const productsQuery = useProductsQuery();

  const [open, setOpen] = React.useState(false);
  const [editedProduct, setEditedProduct] = React.useState<Partial<IProduct> | null>();
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | undefined>('');

  const handleOpen = (editProduct: IProduct) => {
    setEditedProduct(editProduct);
    setImagePreviewUrl(editProduct?.imageUrl);
    setImageFile(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log('Edited Product:', editedProduct);
    console.log('Selected Image File:', imageFile);

    if (imageFile && imagePreviewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    setOpen(false);
  };

  if (productsQuery.isLoading) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        <Loader size={40} />
      </Box>
    );
  }

  if (productsQuery.isError) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        Error: {productsQuery.error.message}
      </Box>
    );
  }

  if (!productsQuery.data?.products.length) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        No products found
      </Box>
    );
  }

  return (
    <Box display='flex' flexWrap='wrap' justifyContent='center' sx={{ mt: 2 }}>
      {productsQuery.data.products.map((product) => (
        <Box
          key={product._id}
          flexBasis={{ xs: '100%', md: '33.33%' }}
          maxWidth={{ xs: '100%', md: '33.33%' }}
          p={1}
          boxSizing='border-box'
        >
          <ProductItem product={product} onEdit={handleOpen} />
        </Box>
      ))}
      {editedProduct && (
        <ProductEditModal
          isOpen={open}
          editedProduct={editedProduct as IProduct}
          handleClose={handleClose}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      )}
    </Box>
  );
};

export default ProductsList;
