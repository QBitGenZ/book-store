import React, { useState, } from 'react';
import { translate, } from '~/helpers';
import { useDispatch, useSelector, } from 'react-redux';
import AddEbook from 'src/pages/Customer/ShareBookPage/Components/AddEbook';
import { getDonationsRequestStart, } from '~/redux/donation/slice';
import { EBookList, } from '~/components';

const ShareBookPage = () => {
  const { shop, } = useSelector((state) => state.config);
  const [modals, setModals,] = useState(false);
  const { createSuccess, } = useSelector((state) => state.donation);

  const dispatch = useDispatch();
  const { donations, } = useSelector((state) => state.donation);

  const handleAddEbook = (addressData) => {
    console.log('Address Data Submitted: ', addressData);
    setModals(false);
  };

  const getMyEBook = () => {
    dispatch(getDonationsRequestStart());
  };

  React.useEffect(() => {
    getMyEBook();
  }, [dispatch, createSuccess,]);

  return (
    <>
      <div className={'flex flex-col gap-3'}>
        <AddEbook
          show={modals}
          setShow={setModals}
          addNewEBook={handleAddEbook}
        />
        <div>
          <button
            onClick={() => setModals(true)}
            className={`border-2 border-[${shop?.accentColor}] p-2 rounded text-sm font-semibold`}
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
      </div>
    </>
  );
};

export default ShareBookPage;
