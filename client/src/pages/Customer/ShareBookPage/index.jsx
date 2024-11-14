import React, { useState, } from 'react';
import { translate, } from '~/helpers';
import { useDispatch, useSelector, } from 'react-redux';
import AddEbook from 'src/pages/Customer/ShareBookPage/Components/AddEbook';
import { getDonationsRequestStart, } from '~/redux/donation/slice';
import { CustomerPagination, EBookList, } from '~/components';
import { getProductsRequestStart, } from '~/redux/product/slice';

const ShareBookPage = () => {
  const { shop, } = useSelector((state) => state.config);
  const [modals, setModals,] = useState(false);
  const { donations, createSuccess, } = useSelector((state) => state.donation);
  const { products, meta, } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(20);

  const handleAddEbook = (addressData) => {
    console.log('Address Data Submitted: ', addressData);
    setModals(false);
  };

  const getMyEBook = () => {
    dispatch(getDonationsRequestStart());
  };

  const getProducts = () => {
    dispatch(
      getProductsRequestStart({
        orderBy,
        page,
        limit,
        descending,
        isEbook: true,
        isShow: true,
      })
    );
  };

  React.useEffect(() => {
    getMyEBook();
    getProducts();
  }, [dispatch, createSuccess,]);

  return (
    <>
      <div className={'flex flex-col gap-3'}>
        <AddEbook
          show={modals}
          setShow={setModals}
          addNewEBook={handleAddEbook}
        />
        <div className={'flex justify-end bg-white rounded shadow-sm p-2'}>
          <button
            onClick={() => setModals(true)}
            className={`left-0 border-2 border-[${shop?.accentColor}] text-white p-2 rounded text-sm font-semibold`}
            style={{
              backgroundColor: shop?.accentColor || '#0065D7',
            }}
          >
            {translate('sharing-book')}
          </button>
        </div>
        {donations && donations.length > 0 && (
          <EBookList
            products={donations}
            title={translate('my-sharing-book')}
          ></EBookList>
        )}

        {products && products.length > 0 && (
          <div>
            <EBookList
              products={products}
              title={translate('shared-book')}
            ></EBookList>
            <CustomerPagination
              currentPage={meta?.page ?? 1}
              totalPages={meta?.totalPage ?? 1}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ShareBookPage;
