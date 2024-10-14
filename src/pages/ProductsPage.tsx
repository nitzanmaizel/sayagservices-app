import PageWrapper from './PageWrapper';
import ProductsList from '../components/Products/ProductsList';
import { useUser } from '../hooks/useUser';
import ProductModal from '../components/Modals/ProductModal';
import { IProduct } from '../types/ProductTypes';

const emptyProduct: Partial<IProduct> = {
  name: '',
  description: '',
  price: 0,
  image: null,
};

const ProductsPage = () => {
  const { userInfo } = useUser();
  return (
    <PageWrapper
      title='רשימת מוצרים'
      trigger={userInfo?.isAdmin && <ProductModal mode='create' initialProduct={emptyProduct} />}
    >
      <ProductsList />
    </PageWrapper>
  );
};

export default ProductsPage;
