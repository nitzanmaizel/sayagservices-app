import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, CardActions, Box } from '@mui/material';
import IconWrapper from './IconWrapper/IconWrapper';

interface CategoryCardProps {
  title: string;
  icon: string;
  description: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, description, link }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Box display='flex' alignItems='center' mb={2}>
          <IconWrapper type={icon} />
          <Typography variant='h5' component='div' ml={1}>
            {title}
          </Typography>
        </Box>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={link} style={{ display: 'flex', flexDirection: 'row-reverse', width: '100%' }}>
          <IconWrapper sx={{ marginRight: 5 }} fontSize='large' type='arrowLeft' />
        </Link>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
