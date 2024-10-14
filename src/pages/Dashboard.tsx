import React from 'react';
import { Box } from '@mui/material';
import PageWrapper from './PageWrapper';
import CategoryCard from '../components/CategoryCard';

const DashboardPage: React.FC = () => {
  return (
    <PageWrapper title='Dashboard'>
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
    </PageWrapper>
  );
};

export default DashboardPage;

const categories = [
  {
    title: 'Products',
    icon: 'products',
    description: 'View and manage your products.',
    link: '/products',
  },
  {
    title: 'Orders',
    icon: 'orders',
    description: 'Manage your orders and shipments.',
    link: '/orders',
  },
  {
    title: 'Users',
    icon: 'users',
    description: 'Manage your user accounts and permissions.',
    link: '/users',
  },
  {
    title: 'Analytics',
    icon: 'analytics',
    description: 'View detailed analytics and reports..',
    link: '/analytics',
  },
];
