import { useQuery } from '@tanstack/react-query';
import fetchAPI from './apiServices';
import { RIProductsType } from '../types/ProductTypes';

export function useProductsQuery() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { products, total, limit, page } = await fetchAPI<RIProductsType>('/products');
      return { products, total, limit, page };
    },
  });
}
