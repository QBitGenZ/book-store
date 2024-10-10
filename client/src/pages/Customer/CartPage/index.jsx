import React from 'react';
import CartItem from '~/pages/Customer/CartPage/Components/CartItem';
import { useDispatch, useSelector, } from 'react-redux';
import { deleteCartRequestStart, getCartRequestStart, updateCartRequestStart, } from '~/redux/cart/slice';
import TotalCart from '~/pages/Customer/CartPage/Components/TotalCart';
import { translate, } from '~/helpers';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faTrash, } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {

  const { cart, } = useSelector(state => state.cart);
  const [allCheck, setAllCheck,] = React.useState(false);
  const [totalPrice, setTotalPrice,] = React.useState(0);
  const [selected, setSelected,] = React.useState([]);

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

  const calTotalPrice = () => {
    let totalPrice = 0;
    selected?.map(item => {
      if (item.product && item.product.price) {
        totalPrice += item.quantity * item.product.price;
      }
    });
    setTotalPrice(totalPrice);
  };

  const selectItem = (selectedItem, isCheck) => {
    if (isCheck) {
      setSelected(prev => [...prev, selectedItem,]);
    } else {
      setSelected(prev => prev.filter(item => item.product._id !== selectedItem.product._id));
    }
  };

  const selectAllItem = () => {
    const newAllCheck = !allCheck;
    setAllCheck(newAllCheck);
    if (newAllCheck) {
      setSelected(cart?.cart?.items || []);
    } else {
      setSelected([]);
    }
  };

  const isAllCheck = () => {
    const isAllCheck = cart?.cart?.items?.length === selected.length;
    setAllCheck(isAllCheck);
  };

  React.useEffect(() => {
    getCart();
  }, [dispatch,]);

  React.useEffect(() => {
    calTotalPrice();
    isAllCheck();
    console.log(selected);
  }, [totalPrice, selected,]);

  return (
    <div className={'flex flex-row gap-4'}>

      <div className='flex flex-col  p-4 bg-white rounded-lg shadow-md w-full'>
        <div className='flex justify-between items-center pb-4 pt-2 border-b w-full text-gray-500'>
          <div className='flex items-start gap-4 w-2/5'>
            <div className='flex content-center'>
              <input
                type='checkbox'
                checked={allCheck}
                onClick={selectAllItem}
                className=' content-center w-4 h-4 accent-blue-500'
              />
            </div>

            <div>
              <div className='flex items-center'>
                <span className='font-normal break-all text-left'>{translate('All')}</span>
              </div>
            </div>
          </div>

          <div className={'w-1/2 flex justify-between '}>
            {/* Price */}
            <div className='w-full content-center'>{translate('Unit-price')}</div>

            {/* Quantity Selector */}
            <div className='w-full content-center'>{translate('Amount')}</div>

            {/* total Price */}
            <div className='w-full content-center'>{translate('becoming-price')}</div>

            {/* Delete Icon */}
            <button
              className='hover:text-red-500 w-full content-center'>
              <FontAwesomeIcon icon={faTrash}/>
            </button>
          </div>
        </div>
        {cart?.cart?.items.map((product) => (
          <div key={product._id}>
            <CartItem
              cartItem={product}
              handleUpdateItem={handleUpdateItem}
              handleDeleteItem={handleDeleteItem}
              allCheck={selected.includes(product)}
              selectItem={selectItem}
            />
          </div>))}
      </div>

      <div className={'w-1/3'}>
        <TotalCart totalPrice={totalPrice}></TotalCart>
      </div>

    </div>

  );
};

export default CartPage;