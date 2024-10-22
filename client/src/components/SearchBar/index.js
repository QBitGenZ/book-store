import React from 'react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  // const nav = useNavigate();
  // const [search, setSearch,] = React.useState('');
  // const handleSearch = () => {
  //     nav(clientROoute.)
  // };
  return (
    <div className='flex items-center rounded-full border p-2 w-full max-w-xl mx-auto'>
      {/* Search Icon */}
      <div className='pl-3'>
        <FontAwesomeIcon icon={faMagnifyingGlass}/>
      </div>
      {/* Input Field */}
      <input
        type='text'
        placeholder='Tìm kiếm'
        className='w-full px-3 text-gray-700 rounded-full focus:outline-none '
      />

    </div>
  );
};

export default SearchBar;
