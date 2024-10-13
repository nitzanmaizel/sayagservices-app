import { Box, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function HeroSection() {
  return (
    <Box position={'relative'} display={'flex'} justifyContent={'space-between'}>
      <Typography
        variant='h1'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          whiteSpace: 'nowrap',
          fontWeight: 900,
          borderRadius: 5,
          padding: '5px 15px',
          zIndex: 1,
          fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
        }}
      >
        Sayag Services
      </Typography>
      <ImageList variant='quilted' cols={8} rowHeight={121}>
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            sx={{ p: 0, mb: 0 }}
          >
            <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading='lazy' />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: 'https://res.cloudinary.com/sayag-services-images/image/upload/v1728846408/hero_right_ntyat7.webp',
    title: 'main',
    rows: 4,
    cols: 4,
  },
  {
    img: 'https://res.cloudinary.com/sayag-services-images/image/upload/v1728846410/hero_left_top_qpsjsj.png',
    title: 'top right',
    rows: 2,
    cols: 4,
  },
  {
    img: 'https://res.cloudinary.com/sayag-services-images/image/upload/v1728846409/hero_left_bottom_ojmbry.jpg',
    title: 'bottom right',
    rows: 2,
    cols: 4,
  },
];
