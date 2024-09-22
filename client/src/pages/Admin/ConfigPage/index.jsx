import React from 'react';
import { useSelector, } from 'react-redux';
import { MiniSidebar, } from '~/components';
import { translate, } from '~/helpers';
import BasicInfo from './components/BasicInfo';
import PhotoInfo from './components/PhotoInfo';
import Description from './components/Description';
import Config from './components/Config';

const ConfigPage = () => {
  const { shop, } = useSelector(state => state.config);

  const [activeTab, setActiveTab,] = React.useState('basic-info');

  const items = [
    {
      label: translate('basic-info'), value: 'basic-info', 
    },
    {
      label: translate('photos'), value: 'photos', 
    },
    {
      label: translate('description'), value: 'description', 
    },
    {
      label: translate('config'), value: 'configuration', 
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
    case 'basic-info':
      return <BasicInfo shop={shop} />;
    case 'photos':
      return <PhotoInfo shop={shop}/>;
    case 'description':
      return <Description shop={shop}/>;
    case 'configuration':
      return <Config shop={shop}/>;
    default:
      return <BasicInfo shop={shop} />;
    }
  };

  const render = () => (
    <div className='flex flex-col'>
      <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('settings')}</div>
      <div className='flex flex-row w-full justify-between gap-3'>
        <MiniSidebar activeTab={activeTab} onTabChange={setActiveTab} items={items}/>
        <div className='w-full'>
          {renderContent()}
        </div>
      </div>
    </div>

  );

  return render();
};

export default ConfigPage;