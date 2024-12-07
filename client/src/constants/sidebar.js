// import React from 'react';
// import { v4 as uuid4, } from 'uuid';
// import { translate, } from '~/helpers';
// import { adminRoutes, } from '~/configs/routes';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import BookOnlineIcon from '@mui/icons-material/BookOnline';
// import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
// import EventIcon from '@mui/icons-material/Event';
// import LocalMallIcon from '@mui/icons-material/LocalMall';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
// import { faBook, faLayerGroup, } from '@fortawesome/free-solid-svg-icons';
//
// const sidebar = [
//   {
//     key: `side-bar-${uuid4()}`,
//     label: <div className={'flex content-center'}><DashboardIcon/><span className={'ml-2'}>{translate('dashboard')}</span></div>,
//     path: adminRoutes.dashboard,
//   },
//   {
//     key: `side-bar-${uuid4()}`,
//     label: <div><ManageAccountsIcon/><span className={'ml-2'}>{translate('user-management')}</span></div>,
//     path: adminRoutes.user,
//   },
//   {
//     key: `side-bar-${uuid4()}`,
//     label: <div><FontAwesomeIcon icon={faLayerGroup} size={'xl'}/><span className={'ml-2'}>{translate('category')}</span></div>,
//     children: [
//       {
//         key: `side-bar-${uuid4()}`,
//         label: translate('product-type'),
//         path: adminRoutes.productType,
//       },
//       {
//         key: `side-bar-${uuid4()}`,
//         label: translate('author'),
//         path: adminRoutes.author,
//       },
//       {
//         key: `side-bar-${uuid4()}`,
//         label: translate('publisher'),
//         path: adminRoutes.publisher,
//       },
//       {
//         key: `side-bar-${uuid4()}`,
//         label: translate('payment-method'),
//         path: adminRoutes.paymentMethod,
//       },
//       {
//         key: `side-bar-${uuid4()}`,
//         label: translate('payment-status'),
//         path: adminRoutes.paymentStatus,
//       },
//       {
//         key: `side-bar-${uuid4()}`,
//         label: translate('delivery-method'),
//         path: adminRoutes.deliveryMethod,
//       },
//       {
//         key: `side-bar-${uuid4()}`,
//         label: translate('delivery-status'),
//         path: adminRoutes.deliveryStatus,
//       },
//     ],
//   },
//   {
//     key: `side-bar-${uuid4()}`,
//     label: <div><FontAwesomeIcon icon={faBook} size={'xl'} /><span className={'ml-3.5'}>{translate('product')}</span></div>,
//     path: adminRoutes.product,
//   },
//   {
//     key: `side-bar-${uuid4()}`,
//     label: <div><BookOnlineIcon/><span className={'ml-2'}>{translate('Ebook')}</span></div>,
//     path: adminRoutes.ebook,
//   },
//   {
//     key: `side-bar-${uuid4()}`,
//     label: <div><BookmarkAddedIcon/><span className={'ml-2'}>{translate('censor-sharing-book')}</span></div>,
//     path: adminRoutes.bookCensorship,
//   },
//   {
//     key: `side-bar-${uuid4()}`,
//     label: <div><EventIcon/><span className={'ml-2'}>{translate('event')}</span></div>,
//     path: adminRoutes.event,
//   },
//
//   {
//     key: `side-bar-${uuid4()}`,
//     label: <div className={'flex content-center'}><LocalMallIcon/><span className={'ml-2'}>{translate('order')}</span></div>,
//     path: adminRoutes.order,
//   },
//
//   {
//     key: `side-bar-${uuid4()}`,
//     label: <div><SettingsIcon/><span className={'ml-2'}>{translate('settings')}</span></div>,
//     path: adminRoutes.config,
//   },
// ];
//
// export default sidebar;

import React from 'react';
import { v4 as uuid4, } from 'uuid';
import { translate, } from '~/helpers';
import { adminRoutes, } from '~/configs/routes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import EventIcon from '@mui/icons-material/Event';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faBook, faLayerGroup, } from '@fortawesome/free-solid-svg-icons';

const sidebar = [
  {
    key: `side-bar-${uuid4()}`,
    label: (
      <div className='flex items-center'>
        <DashboardIcon fontSize='medium' />
        <span className='ml-2'>{translate('dashboard')}</span>
      </div>
    ),
    path: adminRoutes.dashboard,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: (
      <div className='flex items-center'>
        <ManageAccountsIcon fontSize='medium' />
        <span className='ml-2'>{translate('user-management')}</span>
      </div>
    ),
    path: adminRoutes.user,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: (
      <div className='flex items-center'>
        <FontAwesomeIcon icon={faLayerGroup} size='lg' />
        <span className='ml-3'>{translate('category')}</span>
      </div>
    ),
    children: [
      {
        key: `side-bar-${uuid4()}`, label: translate('product-type'), path: adminRoutes.productType, 
      },
      {
        key: `side-bar-${uuid4()}`, label: translate('author'), path: adminRoutes.author, 
      },
      {
        key: `side-bar-${uuid4()}`, label: translate('publisher'), path: adminRoutes.publisher, 
      },
      {
        key: `side-bar-${uuid4()}`, label: translate('payment-method'), path: adminRoutes.paymentMethod, 
      },
      {
        key: `side-bar-${uuid4()}`, label: translate('payment-status'), path: adminRoutes.paymentStatus, 
      },
      {
        key: `side-bar-${uuid4()}`, label: translate('delivery-method'), path: adminRoutes.deliveryMethod, 
      },
      {
        key: `side-bar-${uuid4()}`, label: translate('delivery-status'), path: adminRoutes.deliveryStatus, 
      },
    ],
  },
  {
    key: `side-bar-${uuid4()}`,
    label: (
      <div className='flex items-center'>
        <FontAwesomeIcon icon={faBook} size='lg' />
        <span className='ml-4'>{translate('product')}</span>
      </div>
    ),
    path: adminRoutes.product,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: (
      <div className='flex items-center'>
        <BookOnlineIcon fontSize='medium' />
        <span className='ml-2'>{translate('Ebook')}</span>
      </div>
    ),
    path: adminRoutes.ebook,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: (
      <div className='flex items-center'>
        <BookmarkAddedIcon fontSize='medium' />
        <span className='ml-2'>{translate('censor-sharing-book')}</span>
      </div>
    ),
    path: adminRoutes.bookCensorship,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: (
      <div className='flex items-center'>
        <EventIcon fontSize='medium' />
        <span className='ml-2'>{translate('event-management')}</span>
      </div>
    ),
    path: adminRoutes.event,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: (
      <div className='flex items-center'>
        <LocalMallIcon fontSize='medium' />
        <span className='ml-2'>{translate('order')}</span>
      </div>
    ),
    path: adminRoutes.order,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: (
      <div className='flex items-center'>
        <SettingsIcon fontSize='medium' />
        <span className='ml-2'>{translate('settings')}</span>
      </div>
    ),
    path: adminRoutes.config,
  },
];

export default sidebar;
