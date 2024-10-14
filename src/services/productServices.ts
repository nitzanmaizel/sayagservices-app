import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import fetchAPI from './apiServices';
import { RIProductsType, IProduct } from '../types/ProductTypes';
import { useSnackbar } from '../hooks/useSnackbar';

const emptyProductsData: RIProductsType = { products: [], total: 0, limit: 0, page: 0 };

export function useProductsQuery() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { products, total, limit, page } = await fetchAPI<RIProductsType>('/products');
      return { products, total, limit, page };
    },
  });
}

export function useUpdateProductMutation() {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<
    IProduct,
    Error,
    { productId: string; formData: FormData },
    { previousData: RIProductsType }
  >({
    mutationFn: async ({ productId, formData }) => {
      console.log({ productId, formData });

      return await fetchAPI<IProduct>(`/products/${productId}`, {
        method: 'PUT',
        body: formData,
      });
    },
    onMutate: async ({ productId, formData }) => {
      const { previousData, previousProducts } = await cancelAndGetPreviousProductsData(
        queryClient
      );

      const updatedProductData: Partial<IProduct> = { _id: productId };
      formData.forEach((value, key) => {
        updatedProductData[key as keyof IProduct] = value as any;
      });

      queryClient.setQueryData(['products'], {
        ...previousData,
        products: previousProducts.map((product) =>
          product._id === productId ? { ...product, ...updatedProductData } : product
        ),
      });

      return { previousData };
    },
    onError: (_error, _updatedProduct, context) => {
      queryClient.setQueryData(['products'], context?.previousData);
      showSnackbar('Error updating product', 'error');
    },
    onSuccess: (updatedProduct, _variables, context) => {
      const previousData = context?.previousData;
      if (previousData) {
        const updatedProducts = previousData.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        queryClient.setQueryData(['products'], { ...previousData, products: updatedProducts });
      }
      showSnackbar('Product edited successfully');
    },
  });
}

export function useDeleteProductMutation() {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, { previousData: RIProductsType }>({
    mutationFn: async (id) => {
      await fetchAPI(`/products/${id}`, { method: 'DELETE' });
    },
    onMutate: async (id) => {
      const { previousData, previousProducts } = await cancelAndGetPreviousProductsData(
        queryClient
      );

      queryClient.setQueryData(['products'], {
        ...previousData,
        products: previousProducts.filter((product) => product._id !== id),
      });

      return { previousData };
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(['products'], context?.previousData);
      showSnackbar('Error deleting product', 'error');
    },
    onSuccess: (_data, _id, context) => {
      const previousData = context?.previousData;
      if (previousData) {
        queryClient.setQueryData(['products'], {
          ...previousData,
          products: previousData.products.filter((product) => product._id !== _id),
        });
      }
      showSnackbar('Product deleted successfully');
    },
  });
}

export function useCreateProductMutation() {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<IProduct, Error, FormData, { previousData: RIProductsType }>({
    mutationFn: async (formData) => {
      return await fetchAPI<IProduct>('/products', {
        method: 'POST',
        body: formData,
      });
    },
    onMutate: async (formData) => {
      const { previousData, previousProducts } = await cancelAndGetPreviousProductsData(
        queryClient
      );

      const tempId = Date.now().toString();

      const optimisticProduct: Partial<IProduct> = { _id: tempId };
      formData.forEach((value, key) => {
        optimisticProduct[key as keyof IProduct] = value as any;
      });

      console.log({ optimisticProduct });

      queryClient.setQueryData(['products'], {
        ...previousData,
        products: [...previousProducts, { ...optimisticProduct }],
      });

      return { previousData };
    },
    onError: (_error, _formData, context) => {
      queryClient.setQueryData(['products'], context?.previousData);
      showSnackbar('Error creating product', 'error');
    },
    onSuccess: (createdProduct, _formData, context) => {
      const previousData = context?.previousData;
      if (previousData) {
        queryClient.setQueryData(['products'], {
          ...previousData,
          products: [...previousData.products, createdProduct],
        });
      }
      showSnackbar('Product created successfully');
    },
  });
}

async function cancelAndGetPreviousProductsData(
  queryClient: QueryClient
): Promise<{ previousData: RIProductsType; previousProducts: IProduct[] }> {
  await queryClient.cancelQueries({ queryKey: ['products'] });
  const previousData = queryClient.getQueryData<RIProductsType>(['products']) || emptyProductsData;
  const previousProducts = previousData.products;
  return { previousData, previousProducts };
}
