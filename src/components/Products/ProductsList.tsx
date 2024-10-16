import { Box } from '@mui/material';
import ProductItem from './ProductItem';
import ProductSkeleton from '../Skeletons/ProductSkeleton';
import { useProductsQuery } from '../../services/productServices';

const ProductsList = () => {
  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) {
    return (
      <Box display='flex' flexWrap='wrap' justifyContent='center' sx={{ mt: 2 }}>
        {[...Array(6)].map((_, index) => (
          <Box
            key={index}
            flexBasis={{ xs: '100%', md: '33.33%' }}
            maxWidth={{ xs: '100%', md: '33.33%' }}
            p={1}
            boxSizing='border-box'
          >
            <ProductSkeleton />
          </Box>
        ))}
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
          <ProductItem product={product} />
        </Box>
      ))}
    </Box>
  );
};

export default ProductsList;
