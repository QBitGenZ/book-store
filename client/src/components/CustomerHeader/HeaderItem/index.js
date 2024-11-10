import { useNavigate, } from 'react-router-dom';
import { translate, } from '~/helpers';
import React from 'react';
import PropTypes from 'prop-types';

const HeaderItem = ({ route, name, }) => {
  const navigate = useNavigate();
  const goToNav = () => {
    navigate(route);
  };
  return (
    <div>
      <button
        onClick={goToNav}
        className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50'
      >
        {translate(name)}
      </button>
    </div>
  );
};

HeaderItem.propTypes = {
  route: PropTypes.string,
  name: PropTypes.string,
};
export default HeaderItem;
