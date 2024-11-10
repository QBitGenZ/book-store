import React from 'react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';
import { clientRoutes, } from '~/configs/routes';
import { useNavigate, } from 'react-router-dom';

const SearchBar = () => {
  const nav = useNavigate();
  const [search, setSearch,] = React.useState('');

  const handleSearch = () => {
    if (search.trim()) {
      nav(clientRoutes.search.replace(':query', search));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex items-center rounded-full border p-2 w-full max-w-lg min-w-max mx-6'>
      {/* Input Field */}
      <input
        type='text'
        placeholder='Tìm kiếm'
        className='w-full px-3 text-gray-700 rounded-full focus:outline-none'
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress} // Trigger search on "Enter"
      />
      {/* Search Icon */}
      <div className='px-3' onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass}/>
      </div>
    </div>
  );
};

export default SearchBar;
