// import React, { useState, useRef, } from 'react';
// import PropTypes from 'prop-types';
// // import { Menu, } from '@mui/material';
//
// function Dropdown({ selected, listOptions, order, updateOrder, }) {
//   const [isOpen, setIsOpen,] = useState(false);
//   const dropdownRef = useRef(null);
//
//   const toggleDropdown = () => setIsOpen(prev => !prev);
//
//   const closeDropdown = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setIsOpen(false);
//     }
//   };
//
//   React.useEffect(() => {
//     document.addEventListener('mousedown', closeDropdown);
//     return () => {
//       document.removeEventListener('mousedown', closeDropdown);
//     };
//   }, []);
//
//   return (
//     <div
//       className='relative inline-block text-left w-full'
//       ref={dropdownRef}
//     >
//       <div className={'w-full'}>
//         <button
//           type='button'
//           onClick={toggleDropdown}
//           className='inline-flex w-full text-left justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-light text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
//           aria-expanded={isOpen ? 'true' : 'false'}
//           aria-haspopup='true'
//         >
//           <div className={'w-full truncate '}>
//             {listOptions.find((option) => option._id === selected)?.name}
//           </div>
//           <svg className='-mr-1 size-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
//             <path
//               fillRule='evenodd'
//               d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
//               clipRule='evenodd'
//             />
//           </svg>
//         </button>
//       </div>
//
//       {isOpen && (
//
//         // <Menu id={order._id} open={isOpen}>
//         <div
//           className='absolute left-0 right-0 z-50 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'
//           role='menu'
//           aria-orientation='vertical'
//           aria-labelledby='menu-button'
//           tabIndex='-1'
//         >
//           <div className='py-1' role='none'>
//             {listOptions?.map((option) => (
//               <div
//                 key={option._id}
//                 onClick={() => {
//                   updateOrder(
//                     order._id,
//                     option._id
//                   );
//                   setIsOpen(false);
//                 }}
//                 className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
//                 role='menuitem'
//                 aria-selected={selected === option._id}
//                 tabIndex='-1'
//               >
//                 {option.name}
//               </div>
//             ))}
//           </div>
//         </div>
//         // </Menu>
//       )}
//     </div>
//   );
// }
//
// Dropdown.propTypes = {
//   listOptions: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   order: PropTypes.object.isRequired,
//   selected: PropTypes.string,
//   updateOrder: PropTypes.func,
// };
//
// Dropdown.defaultProps = {
//   selected: null,
// };
//
// export default Dropdown;

import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Button, } from '@mui/material';

function Dropdown({ selected, listOptions, order, updateOrder, }) {
  const [anchorEl, setAnchorEl,] = useState(null);

  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option) => {
    updateOrder(order._id, option._id);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant='outlined'
        className='w-full text-left'
        aria-controls={isOpen ? 'dropdown-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        sx={{
          color: 'black',
          borderColor: 'white',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            color: 'gray.400',
            // backgroundColor: '', // Hover effect
            borderColor: 'white', // Darken border on hover
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)', // Slightly stronger shadow on hover
          },
          textTransform: 'none',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div className='w-full truncate normal-case font-light'>
          {listOptions.find((option) => option._id === selected)?.name || 'Chưa chọn'}
        </div>
      </Button>
      <Menu
        id='dropdown-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
      >
        {listOptions.map((option) => (
          <MenuItem
            key={option._id}
            selected={selected === option._id}
            onClick={() => handleSelect(option)}
            sx={{
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <di className={'normal-case font-light'}>{option.name}</di>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

Dropdown.propTypes = {
  listOptions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  order: PropTypes.object.isRequired,
  selected: PropTypes.string,
  updateOrder: PropTypes.func,
};

Dropdown.defaultProps = {
  selected: null,
};

export default Dropdown;
