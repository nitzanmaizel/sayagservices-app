import { Box, Button, Typography } from '@mui/material';
import PageWrapper from './PageWrapper';
import ProductsList from '../components/ProductsList';

const ProductsPage = () => {
  return (
    <PageWrapper>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography my={3} variant='h4' textAlign={'center'}>
          Products List
        </Typography>
        <Button
          sx={{ height: 40, alignSelf: 'center', textTransform: 'capitalize' }}
          variant='contained'
          color='primary'
        >
          Add Product
        </Button>
      </Box>
      <ProductsList />
    </PageWrapper>
  );
};

export default ProductsPage;
