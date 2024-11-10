import React from 'react';
import CustomerAccount from './Components/CustomerAccount';
import CustomerPassword from './Components/CustomerPassword';

const UserInfoPage = () => {
  // const [activeTab, setActiveTab,] = useState('account');
  //
  // const items = [
  //   {
  //     label: translate('account'), value: 'account',
  //   },
  //   {
  //     label: translate('password'), value: 'password',
  //   },
  // ];
  //
  // const renderContent = () => {
  //   switch (activeTab) {
  //   case 'account':
  //     return <CustomerAccount/>;
  //   case 'password':
  //     return <CustomerPassword/>;
  //   default:
  //     return <CustomerAccount/>;
  //   }
  // };

  return (
    <div className='flex flex-col'>
      {/* <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('profile')}</div>*/}

      <div className={'mb-3'}>
        <CustomerAccount />
      </div>
      <div>
        <CustomerPassword />
      </div>
    </div>
  );
};

export default UserInfoPage;
