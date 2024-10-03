import React from 'react';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';

const DescriptionList = ({ title, subtitle, data, }) => {

  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-zA-Z0-9-]+/g, '')
      .toLowerCase();
  };
  return (
    <>
      <div className={'flex flex-col gap-4'}>

        <div className='p-6 rounded max-w-full h-auto bg-white shadow-sm'>
          <div className={'pr-4 sm:px-0'}>
            <h3 className='text-left text-base font-semibold leading-7 '>{translate(title)}</h3>
            <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>{translate(subtitle)}</p>
          </div>
          <div className={'w-full'}>
            <table className='border-collapse w-full '>
              <tbody className={'divide-y divide-gray-100 w-max'}>
                {data.map((item, index) => (
                  (
                    <tr key={index} className='pr-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <td className='text-left text-base font-medium leading-6 text-gray-500'>{translate(toKebabCase(item.label))}</td>
                      <td className='text-left text-base leading-6 text-gray-700 sm:col-span-2'>{item.value}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

DescriptionList.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.array.isRequired,
};

export default DescriptionList;
