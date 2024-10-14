import { Box, Typography } from '@mui/material';
import CategoryCard from './CategoryCard';

const HomeCategories = () => {
  return (
    <Box>
      <Typography variant='h4' mt={2} textAlign={'center'} gutterBottom>
        קטגוריות
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
    title: 'מוצרים',
    icon: 'products',
    description: 'צפה ברשימת המוצרים שלנו.',
    link: '/products',
  },
  {
    title: 'העבודות שלנו',
    icon: 'work',
    description: 'צפה בעבודות שעשינו עבור לקוחותינו.',
    link: '/orders',
  },
  {
    title: 'אודות',
    icon: 'info',
    description: 'קרא על החברה שלנו.',
    link: '/about',
  },
];
