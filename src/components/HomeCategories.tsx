import { Box, Typography } from '@mui/material';
import CategoryCard from './CategoryCard';

const HomeCategories = () => {
  return (
    <Box>
      <Typography variant='h4' mt={2} textAlign={'center'} gutterBottom>
        Discover our site
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{ flex: '1 1 calc(25% - 16px)', minWidth: '250px', display: 'flex' }}
          >
            <CategoryCard
              title={category.title}
              icon={category.icon}
              description={category.description}
              link={category.link}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomeCategories;

const categories = [
  {
    title: 'Products',
    icon: 'products',
    description: 'See all our products.',
    link: '/products',
  },
  {
    title: 'Our Work',
    icon: 'work',
    description: 'View our portfolio and completed projects.',
    link: '/orders',
  },
  {
    title: 'About Us',
    icon: 'info',
    description: 'Learn more about our company and our team.',
    link: '/about',
  },
];
