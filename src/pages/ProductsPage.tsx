import { Box, Button, Typography } from '@mui/material';
import PageWrapper from './PageWrapper';
import ProductsList from '../components/Products/ProductsList';
import { useUser } from '../hooks/useUser';

const ProductsPage = () => {
  const { userInfo } = useUser();
  return (
    <PageWrapper>
      <Box display={'flex'} justifyContent={userInfo?.isAdmin ? 'space-between' : 'center'}>
        <Typography mt={3} variant='h4'>
          Products List
        </Typography>
        {userInfo?.isAdmin && (
          <Button
            sx={{ height: 40, alignSelf: 'center', textTransform: 'capitalize' }}
            variant='contained'
            color='primary'
          >
            Add Product
          </Button>
        )}
      </Box>
      <ProductsList />
    </PageWrapper>
  );
};

export default ProductsPage;
