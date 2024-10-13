import { Card, CardContent, CardMedia, Typography, CardActionArea, Tooltip } from '@mui/material';
import { IProduct } from '../types/ProductTypes';

const ProductItem = ({ product }: { product: IProduct }) => {
  const { name, description, price, imageUrl } = product;
  const formattedDescription = description.replace(/(\r\n|\n|\r)/gm, ' ');

  return (
    <Card sx={{ margin: 'auto', boxShadow: 5, height: '100%', '&:hover': { boxShadow: 6 } }}>
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
          }).format(price)}
        </Typography>
      </CardContent>
      <CardActionArea></CardActionArea>
    </Card>
  );
};

export default ProductItem;
