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
    img: 'https://img1.wsimg.com/isteam/ip/898568d9-dd99-4882-8bd0-ffac26da4640/fmf_105259.jpg/:/rs=w:1280,h:853',
    title: 'main',
    rows: 4,
    cols: 4,
  },
  {
    img: 'https://breadstory.co.il/wp-content/uploads/2024/08/05-4.png',
    title: 'top right',
    rows: 2,
    cols: 4,
  },
  {
    img: 'https://www.grilltown.co.il/images/itempics/uploads/media_01022024134756.jpg?rnd=0.1550104?rnd=0.6630787557501396',
    title: 'bottom right',
    rows: 2,
    cols: 4,
  },
];
