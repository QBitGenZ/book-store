import React from 'react';
import CartItem from '~/pages/Customer/CartPage/Components/CartItem';
import { useDispatch, useSelector, } from 'react-redux';
import { deleteAllCartRequestStart,
  deleteCartRequestStart,
  getCartRequestStart,
  updateCartRequestStart, } from '~/redux/cart/slice';
import TotalCart from '~/pages/Customer/CartPage/Components/TotalCart';
import { translate, } from '~/helpers';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faTrash, } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, } from 'react-router-dom';
import { clientRoutes, } from '~/configs/routes';

const CartPage = () => {

  const { cart, } = useSelector(state => state.cart);
  const [allCheck, setAllCheck,] = React.useState(false);
  const [totalPrice, setTotalPrice,] = React.useState(0);
  // const [selected, setSelected,] = React.useState([]);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const getCart = () => {
    dispatch(getCartRequestStart());
  };

  const handleUpdateItem = (productId, quantity, checked) => {
    const data = {
      product: productId,
      quantity: quantity,
      checked: checked,
    };
    dispatch(updateCartRequestStart(JSON.stringify(data)));
  };

  const handleDeleteItem = (productId) => {
    const data = {
      product: productId,
    };
    dispatch(deleteCartRequestStart(JSON.stringify(data)));
  };

  // const calTotalPrice = () => {
  //   let totalPrice = 0;
  //   selected?.map(item => {
  //     if (item.product && item.product.price) {
  //       totalPrice += item.quantity * item.product.price;
  //     }
  //   });
  //   setTotalPrice(totalPrice);
  // };

  // const calTotalPrice = () => {
  //   const total = selected.reduce((acc, item) => {
  //     return item.product && item.product.price
  //       ? acc + item.quantity * item.product.price
  //       : acc;
  //   }, 0);
  //   setTotalPrice(total);
  // };

  const calTotalPrice = () => {
    const total = cart?.cart?.items.reduce((acc, item) => {
      return item.checked && item.product.price
        ? acc + item.quantity * item.product.price
        : acc;
    }, 0);
    setTotalPrice(total);
  };

  // const selectItem = (selectedItem, isCheck) => {
  //   if (isCheck) {
  //     setSelected(prev => [...prev, selectedItem,]);
  //   } else {
  //     setSelected(prev => prev.filter(item => item.product._id !== selectedItem.product._id));
  //   }
  // };

  const selectAllItem = (e) => {
    const isChecked = e.target.checked;
    setAllCheck(isChecked);
    cart?.cart?.items.map((item) => {
      handleUpdateItem(item.product._id, item.quantity, isChecked);
    });
  };

  const isAllCheck = () => {
    const allChecked = cart?.cart?.items.every((item) => item.checked);
    setAllCheck(allChecked);
  };

  const deleteAllItem = () => {
    dispatch(deleteAllCartRequestStart());
  };

  const goToHome = () => {
    nav(clientRoutes.home);
  };

  // console.log('handlePurchase:', typeof (handlePurchase));

  React.useEffect(() => {
    getCart();
  }, [dispatch, allCheck,]);

  React.useEffect(() => {
    calTotalPrice();
    isAllCheck();
  }, [totalPrice, cart, allCheck, dispatch,]);

  return (
    cart?.cart?.items.length !== 0 ? (<>
      <div className={'flex flex-row gap-4'}>
        <div className='flex flex-col  p-4 bg-white rounded-lg shadow-md w-full'>
          <div className='flex justify-between items-center pb-4 pt-2 border-b w-full text-gray-500'>
            <div className='flex items-start gap-4 w-2/5'>
              <div className='flex content-center'>
                <input
                  type='checkbox'
                  checked={allCheck}
                  onChange={selectAllItem}
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
                className='hover:text-red-500 w-full content-center' onClick={deleteAllItem}>
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
              />
            </div>))}
        </div>

        <div className={'w-1/3'}>
          <TotalCart
            totalPrice={totalPrice}
          >
          </TotalCart>
        </div>

      </div>
    </>
    )
      :
      <div className={'rounded shadow-sm bg-white w-full flex flex-col items-center p-16'}>
        <img className='mb-4' src={`${process.env.PUBLIC_URL}/assets/pages/other/ico_emptycart.svg`}
          alt='Empty Cart'/>
        <p>{translate('There are no products in your shopping cart.')}</p>
        <button
          className='w-fit py-2 px-4 rounded shadow-md bg-red-600 text-white font-semibold mt-4'
          onClick={goToHome}>
          {translate('Go to Home')}
        </button>
      </div>

  );
};

export default CartPage;