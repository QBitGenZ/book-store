import React, { useEffect, useState, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPlus, } from '@fortawesome/free-solid-svg-icons';

import ShippingMethod from './Components/ShippingMethod';
import PaymentMethod from '~/pages/Customer/OneStepCheckOutPage/Components/PaymentMethod';
import AddNewAddressModal from '~/pages/Customer/OneStepCheckOutPage/Components/AddNewAddressModal';
import UpdateAddressModal from '~/pages/Customer/OneStepCheckOutPage/Components/UpdateAddressModal';
import { ConfirmationModal, } from '~/components';
import { createAddressRequestStart,
  deleteAddressRequestStart,
  resetSuccessStates,
  updateAddressRequestStart, } from '~/redux/address/slice';
import { getInfoRequestStart, } from '~/redux/auth/slice';
import { getDeliveryMethodsRequestStart, } from '~/redux/deliveryMethod/slice';
import { getPaymentMethodsRequestStart, } from '~/redux/paymentMethod/slice';
import { getCartRequestStart, } from '~/redux/cart/slice';
import OrderSummary from '~/pages/Customer/OneStepCheckOutPage/Components/OrderSummary';
// import { getShopRequestStart, } from '~/redux/config/slice';
import { createOrderRequestStart,
  resetOrderRequest, } from '~/redux/order/slice';
import { useNavigate, } from 'react-router-dom';
import { clientRoutes, } from '~/configs/routes';

const OneStepCheckOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, } = useSelector((state) => state.auth);
  const { createSuccess, updateSuccess, deleteSuccess, } = useSelector(
    (state) => state.address
  );
  const { deliveryMethods, } = useSelector((state) => state.deliveryMethod);
  const { paymentMethods, } = useSelector((state) => state.paymentMethod);
  const { cart, } = useSelector((state) => state.cart);
  const { shop, } = useSelector((state) => state.config);
  const { order, } = useSelector((state) => state.order);

  const [selectedAddress, setSelectedAddress,] = useState(null);
  const [selectedDeliveryMethods, setSelectedDeliveryMethods,] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod,] = useState(null);
  const [modals, setModals,] = useState({
    newAddress: false,
    updateAddress: false,
    confirm: false,
  });
  const [confirmConfig, setConfirmConfig,] = useState({
    message: '',
    action: () => {},
  });

  const getItems = (cart) => {
    return cart?.cart?.items.filter((item) => item.checked === true);
  };
  // Initial load of user data
  useEffect(() => {
    if (!user) {
      dispatch(getInfoRequestStart());
    }
    dispatch(getDeliveryMethodsRequestStart());
    dispatch(getPaymentMethodsRequestStart());
    dispatch(getCartRequestStart());

    dispatch(resetSuccessStates());
    // console.log(getItems(cart));
  }, [dispatch, user,]);

  // Handle address operation success and cleanup
  useEffect(() => {
    const hasAddressChange = createSuccess || updateSuccess || deleteSuccess;
    if (hasAddressChange) {
      dispatch(getInfoRequestStart());
      // Reset success states after handling the success
      const cleanup = setTimeout(() => {
        dispatch(resetSuccessStates());
      }, 100); // Small delay to ensure getInfo has started

      return () => clearTimeout(cleanup);
    }
  }, [createSuccess, updateSuccess, deleteSuccess, dispatch,]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetSuccessStates());
    };
  }, [dispatch, order,]);

  useEffect(() => {
    // if (selectedDeliveryMethods) {
    //   dispatch(getCartRequestStart()); // Re-fetch the cart data or perform other updates
    // }
  }, [selectedDeliveryMethods, dispatch,]);

  const formatAddress = (address) => {
    return `${address.name} | ${address.addressDetail} | ${address.phone}`;
  };

  const handleAddNewAddress = (addressData) => {
    const formattedAddress = {
      name: addressData.name,
      phone: addressData.phone,
      addressDetail: addressData.addressDetail,
    };

    dispatch(createAddressRequestStart(JSON.stringify(formattedAddress)));
    setModals((prev) => ({
      ...prev,
      newAddress: false,
    }));
  };

  const handleUpdateAddress = (updatedAddress) => {
    const data = {
      id: updatedAddress.id,
      data: JSON.stringify(updatedAddress),
    };

    setConfirmConfig({
      message: 'Bạn có chắc chắn muốn lưu thay đổi này không?',
      action: () => {
        dispatch(updateAddressRequestStart(data));
        setModals((prev) => ({
          ...prev,
          updateAddress: false,
          confirm: false,
        }));
      },
    });
    setModals((prev) => ({
      ...prev,
      confirm: true,
    }));
  };

  const handleDeleteAddress = (address) => {
    if (!address?._id) return;

    setConfirmConfig({
      message: 'Bạn có chắc chắn muốn xóa mục này không?',
      action: () => {
        dispatch(deleteAddressRequestStart(address._id));
        setModals((prev) => ({
          ...prev,
          confirm: false,
        }));
        if (selectedAddress?._id === address._id) {
          setSelectedAddress(null);
        }
      },
    });
    setModals((prev) => ({
      ...prev,
      confirm: true,
    }));
  };

  // const requestCreateOrder = () => {
  //   dispatch(createOrderRequestStart(JSON.stringify({
  //     address: selectedAddress?.addressDetail,
  //     delivery: selectedDeliveryMethods?._id,
  //     payment: selectedPaymentMethod?._id,
  //   })));
  // };

  const createOrder = async () => {
    if (selectedAddress && selectedPaymentMethod && selectedDeliveryMethods) {
      await dispatch(
        createOrderRequestStart(
          JSON.stringify({
            address: selectedAddress,
            delivery: selectedDeliveryMethods?._id,
            payment: selectedPaymentMethod?._id,
          })
        )
      );
    }
  };

  React.useEffect(() => {
    if (order && selectedPaymentMethod) {
      if (selectedPaymentMethod.name === 'Thanh toán trực tuyến') {
        handlePayment(order._id);
      } else {
        navigate(clientRoutes.orderSuccess);
      }
    }
  }, [order,]);

  const handlePayment = (orderId) => {
    fetch(`${process.env.REACT_APP_HOST_IP}/vnpay/create_payment_url`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: orderId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.open(data?.vnpUrl, '_self');
        dispatch(resetOrderRequest());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ConfirmationModal
        body={confirmConfig.message}
        onConfirm={confirmConfig.action}
        onHide={() =>
          setModals((prev) => ({
            ...prev,
            confirm: false,
          }))
        }
        title='Xác nhận'
        show={modals.confirm}
      />
      <AddNewAddressModal
        show={modals.newAddress}
        setShow={(show) =>
          setModals((prev) => ({
            ...prev,
            newAddress: show,
          }))
        }
        addNewAddress={handleAddNewAddress}
      />
      <UpdateAddressModal
        data={selectedAddress}
        show={modals.updateAddress}
        setShow={(show) =>
          setModals((prev) => ({
            ...prev,
            updateAddress: show,
          }))
        }
        updateAddress={handleUpdateAddress}
      />

      <div className='max-w-3xl mx-auto space-y-6'>
        {/* Delivery Address */}
        <div className='space-y-4 p-4 rounded-lg bg-white'>
          <h2 className='font-semibold text-lg text-left'>
            <FontAwesomeIcon icon={faLocationDot} /> Địa chỉ giao hàng
          </h2>

          <div className='space-y-2'>
            {user?.address?.map((address, index) => (
              <div
                key={address._id || index}
                className='flex items-center justify-between gap-3 p-3 border rounded'
              >
                <div
                  className='flex items-center flex-1 text-left'
                  onClick={() => setSelectedAddress(address)}
                >
                  <input
                    type='radio'
                    name='selectedAddress'
                    value={address._id}
                    checked={selectedAddress?._id === address._id}
                    onChange={() => setSelectedAddress(address)}
                    className='mr-2'
                    style={{
                      accentColor:
                        selectedAddress?._id === address._id
                          ? shop?.accentColor
                          : '#999',
                    }}
                  />
                  <span>{formatAddress(address)}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    className='text-blue-500 font-medium'
                    onClick={() => {
                      setSelectedAddress(address);
                      setModals((prev) => ({
                        ...prev,
                        updateAddress: true,
                      }));
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className='text-blue-500 font-medium'
                    onClick={() => handleDeleteAddress(address)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className='flex items-center gap-2 text-gray-600 ml-6 cursor-pointer'
            onClick={() =>
              setModals((prev) => ({
                ...prev,
                newAddress: true,
              }))
            }
          >
            <FontAwesomeIcon icon={faPlus} />
            <div>Giao hàng đến địa chỉ khác</div>
          </div>
        </div>

        <ShippingMethod
          deliveryMethods={deliveryMethods}
          selectedDeliveryMethod={selectedDeliveryMethods}
          setSelectedDeliveryMethod={setSelectedDeliveryMethods}
        />
        <PaymentMethod
          paymentMethods={paymentMethods}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
        <OrderSummary
          items={getItems(cart)}
          shippingCost={selectedDeliveryMethods?.cost}
        />
        {/* <FontAwesomeIcon icon={faCircleCheck}/>*/}

        <div className='flex flex-col gap-3 '>
          <button
            onClick={createOrder}
            className='w-full bg-red-600 text-white py-3 rounded font-medium hover:bg-red-700'
          >
            Xác nhận đặt hàng
          </button>
        </div>
      </div>
    </>
  );
};

export default OneStepCheckOutPage;
