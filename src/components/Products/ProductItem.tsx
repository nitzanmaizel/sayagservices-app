import { Card, CardContent, CardMedia, Typography, Tooltip, Box } from '@mui/material';

import { IProduct } from '../../types/ProductTypes';
import { useUser } from '../../hooks/useUser';

import ProductItemActions from './ProductItemActions';

interface IProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: IProductItemProps) => {
  const { userInfo } = useUser();

  const { name, description, price, imageUrl } = product;

  return (
    <Card
      sx={{
        position: 'relative',
        margin: 'auto',
        boxShadow: 3,
        height: '100%',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardMedia
          component='img'
          height='200'
          image={imageUrl}
          alt={name}
          sx={{ borderRadius: 1 }}
        />
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Tooltip title={description}>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              whiteSpace: 'pre-line',
              textOverflow: 'ellipsis',
              flexGrow: 1,
              WebkitLineClamp: { xs: 3, sm: 4, md: 5 },
            }}
          >
            {description}
          </Typography>
        </Tooltip>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant='h6' color='text.primary'>
            {new Intl.NumberFormat('he-IL', {
              style: 'currency',
              currency: 'ILS',
            }).format(Number(price))}
          </Typography>
          {userInfo?.isAdmin && <ProductItemActions product={product} />}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
