import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductRequestStart, } from '~/redux/product/slice';
import { useParams, } from 'react-router-dom';
import ProductPurchaseSection from '~/pages/Customer/ProductInfoPage/Components/ProductPurchaseSection';
import { ProductDetailInformation, ProductImage, } from '~/components';
import ProductNameCard from '~/pages/Customer/ProductInfoPage/Components/ProductNameCard';
import { createCartRequestStart, resetState, } from '~/redux/cart/slice';
import { getPublishersRequestStart, } from '~/redux/publisher/slice';
import { getTypesRequestStart, } from '~/redux/productType/slice';
import { getAuthorsRequestStart, } from '~/redux/author/slice';
import { getAllFormatsRequestStart, } from '~/redux/format/slice';
import { Snackbar, Slide, } from '@mui/material';

const ProductInfoPage = () => {
  const dispatch = useDispatch();
  const { id, } = useParams();

  const { product, } = useSelector((state) => state.product);
  // const { createSuccess, } = useSelector((state) => state.cart);

  const [snackbarState, setSnackbarState,] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  });

  const { vertical, horizontal, open, message, } = snackbarState;

  const handleSnackbarOpen = (newMessage) => {
    setSnackbarState({
      ...snackbarState, open: true, message: newMessage, 
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarState({
      ...snackbarState, open: false, 
    });
  };

  const getProduct = () => {
    dispatch(getProductRequestStart(id));
  };

  const handleAddToCart = (product, quantity) => {
    const cartData = {
      product: product._id,
      quantity,
    };
    dispatch(createCartRequestStart(JSON.stringify(cartData)));
    handleSnackbarOpen('Sản phẩm đã được thêm vào giỏ hàng!');
  };

  // React.useEffect(() => {
  //   if (createSuccess) {
  //
  //     const timer = setTimeout(() => {
  //       dispatch(resetState()); // Reset createSuccess state
  //       handleSnackbarClose(); // Close the Snackbar
  //     }, 3000);
  //
  //     return () => clearTimeout(timer); // Cleanup timer on component unmount or re-render
  //   }
  // }, [createSuccess,]);

  React.useEffect(() => {
    getProduct();
    dispatch(resetState()); // Reset createSuccess state
    dispatch(getPublishersRequestStart({
      limit: 1000, 
    }));
    dispatch(getTypesRequestStart({
      limit: 1000, 
    }));
    dispatch(getAuthorsRequestStart({
      limit: 1000, 
    }));
    dispatch(getAllFormatsRequestStart({
      limit: 1000, 
    }));
  }, [dispatch, id,]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical, horizontal, 
        }}
        open={open}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
        message={message}
        autoHideDuration={3000}
        key={vertical + horizontal}
        sx={{
          '& .MuiSnackbarContent-root': {
            color: '#1E4620',
            backgroundColor: '#EDF7ED',
          },
        }}
      />
      <div className='relative flex flex-col gap-3 m-2'>
        <div className='overflow-y-auto flex flex-row gap-3'>
          <div className='flex flex-col gap-3 sticky top-0'>
            <div className='sticky top-0 flex flex-col gap-3'>
              <ProductImage product={product} />
            </div>
            <div>
              {product?.stockQuantity > 0 && (
                <ProductPurchaseSection
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              )}
            </div>
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <ProductNameCard product={product} />
            <ProductDetailInformation
              product={product}
              hiddenFields={[
                '_id',
                '__v',
                'images',
                'description',
                'donor',
                'cost',
                'price',
                'stockQuantity',
                'quantity',
                'name',
                'isShow',
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfoPage;
