import React, { createContext, useState, ReactNode, useCallback } from 'react';

import { fetchAPI } from '../services/apiServices';
import { IProduct } from '../types/ProductTypes';

type ProductContextType = {
  currentProduct: IProduct | null;
  loading: boolean;
  error: string | null;

  createProduct: (productData: FormData) => Promise<IProduct | undefined>;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = useCallback(async (productData: FormData) => {
    try {
      setLoading(true);
      const createdProduct: IProduct = await fetchAPI<IProduct>('/products', {
        method: 'POST',
        body: productData,
      });

      setCurrentProduct(createdProduct);
      setLoading(false);
      return createdProduct;
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error creating new product: ${error.message}`);
      } else {
        setError('An unexpected error occurred.');
      }
      setLoading(false);
      throw error;
    }
  }, []);

  return (
    <ProductContext.Provider value={{ currentProduct, loading, error, createProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
