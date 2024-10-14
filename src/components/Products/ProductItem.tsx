import { Card, CardContent, CardMedia, Typography, Tooltip, CardActions } from '@mui/material';
import ProductModal from '../Modals/ProductModal';
import AreYouSureModal from '../Modals/AreYouSureModal';
import { IProduct } from '../../types/ProductTypes';
import { useUser } from '../../hooks/useUser';
import { useDeleteProductMutation } from '../../services/productServices';

interface IProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: IProductItemProps) => {
  const { userInfo } = useUser();
  const productDeleteMutation = useDeleteProductMutation();

  const { name, description, price, imageUrl } = product;
  const formattedDescription = description.replace(/(\r\n|\n|\r)/gm, ' ');

  const handleDelete = (productId: string) => {
    productDeleteMutation.mutate(productId);
  };

  return (
    <Card
      sx={{
        position: 'relative',
        margin: 'auto',
        boxShadow: 5,
        height: '100%',
        '&:hover': { boxShadow: 6 },
      }}
    >
      {userInfo?.isAdmin && (
        <CardActions
          sx={{
            position: 'absolute',
            right: 0,
            borderRadius: '50%',
            background: '#fff',
            padding: 0,
            '& >:not(style)~:not(style)': { margin: 0, paddingLeft: 0 },
          }}
        >
          <AreYouSureModal item='מוצר' handleDelete={() => handleDelete(product._id!)} />
          <ProductModal mode='edit' initialProduct={product} />
        </CardActions>
      )}
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
              textOverflow: 'ellipsis',
              flexGrow: 1,
              WebkitLineClamp: { xs: 3, sm: 4, md: 5 },
            }}
          >
            {formattedDescription}
          </Typography>
        </Tooltip>
        <Typography variant='h6' color='text.primary'>
          {new Intl.NumberFormat('he-IL', {
            style: 'currency',
            currency: 'ILS',
          }).format(Number(price))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
