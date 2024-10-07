import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export { useProduct };
