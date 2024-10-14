import { Box, Typography } from '@mui/material';
import PageWrapper from './PageWrapper';
import ProductsList from '../components/Products/ProductsList';
import { useUser } from '../hooks/useUser';
import ProductCreateModal from '../components/Products/ProductCreateModal';

const ProductsPage = () => {
  const { userInfo } = useUser();
  return (
    <PageWrapper>
      <Box mt={3} display={'flex'} justifyContent={userInfo?.isAdmin ? 'space-between' : 'center'}>
        <Typography variant='h4'>Products List</Typography>
        {userInfo?.isAdmin && <ProductCreateModal />}
      </Box>
      <ProductsList />
    </PageWrapper>
  );
};

export default ProductsPage;
