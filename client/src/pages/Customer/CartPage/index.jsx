import React from 'react';
import CartItem from '~/pages/Customer/CartPage/Components/CartItem';
import { useDispatch, useSelector, } from 'react-redux';
import { deleteCartRequestStart, getCartRequestStart, updateCartRequestStart, } from '~/redux/cart/slice';

const CartPage = () => {

  const { cart, } = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const getCart = () => {
    dispatch(getCartRequestStart());
  };

  const handleUpdateItem = (productId, quantity) => {
    const data = {
      product: productId,
      quantity: quantity,
    };
    dispatch(updateCartRequestStart(JSON.stringify(data)));
  };

  const handleDeleteItem = (productId) => {
    const data = {
      product: productId,
    };
    dispatch(deleteCartRequestStart(JSON.stringify(data)));
  };

  React.useEffect(() => {
    getCart();
  }, [dispatch,]);
  return (
    <div className='flex flex-col p-4 bg-white rounded-lg shadow-md'>
      {cart?.cart?.items.map((product) => (
        <div key={product._id}><CartItem cartItem={product} handleUpdateItem={handleUpdateItem}
          handleDeleteItem={handleDeleteItem}/></div>))}
    </div>
  );
};

export default CartPage;