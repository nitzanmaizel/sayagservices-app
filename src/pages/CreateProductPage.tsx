import React from 'react';

import PageWrapper from './PageWrapper';
import CreateProductForm from '../components/CreateProductForm';

const CreateProductPage: React.FC = () => {
  return (
    <PageWrapper>
      <CreateProductForm />
    </PageWrapper>
  );
};

export default CreateProductPage;
