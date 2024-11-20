import React, { useEffect, useRef, } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, } from 'react-redux';
import { getCartRequestStart, } from '~/redux/cart/slice';
import { formatCurrency, } from '~/helpers';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, styled, } from '@mui/material';

const CartModal = () => {

  const { cart, } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { shop, } = useSelector(state => state.config);

  const [show, setShow,] = React.useState(false);
  const timeoutRef = useRef(null);
  const [cartNumber, setCartNumber,] = React.useState(0);

  const getCartNumber = () => {
    setCartNumber(cart?.cart?.items?.length);
  };
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); // Clear any pending timeout
    setShow(true); // Show immediately on hover
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShow(false); // Delay hiding dropdown
    }, 300); // 300ms delay
  };

  const StyledBadge = styled(Badge)(({ theme, }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      color: 'white',
      backgroundColor: shop?.accentColor,
    },
  }));

  useEffect(() => {
    if (!cart) {
      dispatch(getCartRequestStart());
    }
  }, [cart, dispatch,]);
  React.useEffect(() => {
    getCartNumber();
  }, [cart,]);

  return (
    <div
      className='relative inline-block text-left'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <IconButton aria-label='cart'>
          <StyledBadge
            badgeContent={cartNumber}
          >
            <ShoppingCartIcon/>
          </StyledBadge>
        </IconButton>
      </div>
      {show && (
        <div
          className='absolute right-0 z-10 mt-0.5 px-4 py-2 w-fit origin-top transform translate-x-5 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          // className='absolute right-0 z-10 mt-2.5 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex='-1'
        >
          <div className='py-2' role='none'>
            {cart?.cart.items.slice(0, 3).map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem}/>
            ))}
          </div>
          {cart?.cart.items.length > 3 && (
            <div className='text-center mt-2'>
              <button
                className='text-blue-500 hover:underline'
              >
                Xem thêm
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
  ;
};

function CartItem({ cartItem, }) {
  return (
    <div className='flex justify-between items-center border-b py-4 max-w-[500px] min-w-[450px]'>

      <div className='flex items-center gap-2 w-full'>
        {cartItem?.product?.images?.[0] ? (
          <img
            src={`${process.env.REACT_APP_HOST_IP}/${cartItem?.product?.images?.[0]}`}
            alt={cartItem?.product?.name}
            className='w-10 h-12 p-0.5 object-fit-contain aspect-square border rounded'
          />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/assets/pages/other/noImageItem.jpg`}
            alt='Product'
            className='w-20 h-24 object-cover'
          />
        )}

        <div>
          <div className='flex items-center'>
            <div className='text-sm text-left w-full'>
              {cartItem?.product?.name}
            </div>
          </div>
        </div>

        <div className='font-semibold text-xs w-full content-center'>
          {formatCurrency(cartItem?.product?.price)}
        </div>
        <div className='text-red-500 text-xs font-bold w-full content-center'>
          {formatCurrency(cartItem?.product?.price * cartItem.quantity)}
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartModal;
