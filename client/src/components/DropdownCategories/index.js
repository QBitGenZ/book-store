import React, { useRef, } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, } from 'react-router-dom';
import { clientRoutes, } from '~/configs/routes';

function DropdownCategories({ name, items, }) {
  const nav = useNavigate();
  const [show, setShow,] = React.useState(false);
  const timeoutRef = useRef(null);

  const handleNav = (id) => {
    nav(clientRoutes.categories.replace(':id', id));
    setShow(false); // Close dropdown after navigating
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); // Clear any pending timeout
    setShow(true); // Show immediately on hover
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShow(false); // Delay hiding dropdown
    }, 300); // 300ms delay
  };

  return (
    <div
      className='relative inline-block text-left'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <button
          type='button'
          className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50'
          // ring-1 ring-inset ring-gray-300 shadow-sm
          id='menu-button'
          aria-expanded={show}
          aria-haspopup='true'
        >
          {name}
          <svg
            className='-mr-1 h-5 w-5 text-gray-400'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
            data-slot='icon'
          >
            <path
              fillRule='evenodd'
              d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      {show && (
        <div
          className='absolute left-1/2 z-10 mt-2.5 px-4 py-2 w-[500px] origin-top transform -translate-x-1/2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          // className='absolute right-0 z-10 mt-2.5 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex='-1'
        >
          <div className='grid grid-cols-2 gap-2 py-2' role='none'>
            {items?.map((item, index) => (
              <div
                key={index}
                onClick={() => handleNav(item._id)}
                className='block px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 w-full'
                role='menuitem'
                tabIndex='-1'
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

DropdownCategories.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default DropdownCategories;
