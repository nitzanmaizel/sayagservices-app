import { Box, Typography } from '@mui/material';
import PageWrapper from './PageWrapper';
import ProductsList from '../components/Products/ProductsList';
import { useUser } from '../hooks/useUser';
import ProductModal from '../components/Products/ProductModal';
import { IProduct } from '../types/ProductTypes';

const emptyProduct: Partial<IProduct> = {
  name: '',
  description: '',
  price: 0,
  image: null,
};

const ProductsPage = () => {
  const { userInfo } = useUser();
  return (
    <PageWrapper>
      <Box mt={3} display={'flex'} justifyContent={userInfo?.isAdmin ? 'space-between' : 'center'}>
        <Typography variant='h4'>Products List</Typography>
        {userInfo?.isAdmin && <ProductModal mode='create' initialProduct={emptyProduct} />}
      </Box>
      <ProductsList />
    </PageWrapper>
  );
};

export default ProductsPage;
