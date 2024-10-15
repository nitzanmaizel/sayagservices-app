import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import IconWrapper from '../IconWrapper/IconWrapper';
import { useDeleteProductMutation } from '../../services/productServices';
import AreYouSureModal from '../Modals/AreYouSureModal';
import ProductModal from '../Modals/ProductModal';
import { IProduct } from '../../types/ProductTypes';

const ProductItemActions = ({ product }: { product: IProduct }) => {
  const productDeleteMutation = useDeleteProductMutation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
  };
  const handleClose = () => setAnchorEl(null);

  const handleDelete = (productId: string) => productDeleteMutation.mutate(productId);

  return (
    <React.Fragment>
      <IconWrapper onClick={handleClick} type='more' color='primary' />
      <Button sx={{ minWidth: 0 }}></Button>
      <Menu
        id='product-mene'
        aria-labelledby='product-menu-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem sx={{ p: 0 }}>
          <AreYouSureModal
            item='מוצר'
            buttonText='מחק מוצר'
            handleDelete={() => handleDelete(product._id!)}
            onCancel={handleClose}
          />
        </MenuItem>
        <MenuItem sx={{ p: 0 }}>
          <ProductModal onClose={handleClose} mode='edit' initialProduct={product} />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ProductItemActions;
