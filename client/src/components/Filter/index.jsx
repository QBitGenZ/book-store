import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, } from '@fortawesome/free-solid-svg-icons';
import { getTypesRequestStart, } from '~/redux/productType/slice';

function FilterSidebar({
  orderBy,
  setOrderBy,
  descending,
  setDescending,
  page,
  limit,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  filterByPrice,
  refresh,
}) {
  const { types, } = useSelector((state) => state.type);
  const { shop, } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  const getTypes = () => {
    dispatch(
      getTypesRequestStart({
        limit: 100,
      })
    );
  };

  React.useEffect(() => {
    getTypes();
  }, [dispatch, page, limit, orderBy,]);

  // React.useEffect(() => {
  //   filterByPrice();
  // }, [selectedCategory, orderBy, descending,]);

  return (
    <div className='p-4 bg-white rounded-md w-64 text-left shadow-sm'>
      {/* Title */}
      <div className='text-xl font-bold mb-4'>Lọc Theo</div>
      {/* Category Section */}
      <div className='mb-6 border-b'>
        <h6
          className='font-normal mb-3'
          onClick={() => {
            setSelectedCategory(null);
          }}
          style={{
            fontWeight: selectedCategory === null ? 'bold' : 'lighter',
            color:
              selectedCategory === null
                ? shop?.accentColor || 'red'
                : 'inherit',
          }}
        >
          {translate('all-types')}
        </h6>
        <ul className='space-y-2 font-light pl-2'>
          {types?.map((item, index) => (
            <li key={index} className='flex items-center'>
              {/* <input*/}
              {/*  type='checkbox'*/}
              {/*  className='form-checkbox text-red-600'*/}
              {/* />*/}
              <div
                onClick={() => {
                  setSelectedCategory(item._id);
                }}
                style={{
                  fontWeight:
                    selectedCategory === item._id ? 'bold' : 'lighter',
                  color:
                    selectedCategory === item._id
                      ? shop?.primaryColor || 'red'
                      : 'inherit',
                }}
                className={'ml-1 '}
              >
                <button className={'text-left'}>{item.name}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Order By */}
      <div className='mb-6 border-b'>
        {/* <h6 className='font-normal mb-3'>{translate('price')}</h6>*/}

        <div className={'flex flex-col gap-3 w-full mb-6'}>
          <span className={'font-normal'}>Nhập khoảng giá</span>
          <input
            type='number'
            name='price'
            id='price'
            className={`block w-full rounded-md border-0 py-1.5 pl-3 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[${shop.accentColor}] sm:text-sm/6`}
            placeholder='Từ'
            onChange={(e) => {
              setMinPrice(e.target.value);
            }}
            value={minPrice}
            min={0}
          />

          <input
            type='number'
            name='price'
            id='price'
            className={`block w-full rounded-md border-0 py-1.5 pl-3 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[${shop.accentColor}] sm:text-sm/6`}
            placeholder='Đến'
            onChange={(e) => {
              setMaxPrice(e.target.value);
            }}
            value={maxPrice}
            min={0}
          />
          <button
            type='button'
            onClick={filterByPrice}
            className={`block border-2 mt-1 w-full px-3 py-1 rounded text-center text-sm font-semibold text-[${shop.accentColor}] e`}
            style={{
              color: shop.accentColor,
              borderColor: shop.accentColor,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.backgroundColor = shop?.accentColor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = shop.accentColor;
              e.currentTarget.style.borderColor = shop.accentColor;
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            {translate('filter')}
          </button>
          <button
            type='button'
            onClick={refresh}
            className={`block border-2 mt-1 w-full px-3 py-1 rounded text-center text-sm font-semibold text-[${shop.accentColor}] e`}
            style={{
              borderColor: shop.accentColor,
              color: shop.accentColor,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.backgroundColor = shop?.accentColor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = shop.accentColor;
              e.currentTarget.style.borderColor = shop.accentColor;
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            {translate('refresh')}
          </button>
        </div>
      </div>

      <div className='mb-6 border-b'>
        {/* <h6 className='font-normal mb-3'>{translate('price')}</h6>*/}

        <div className={'flex flex-col gap-3 w-full mb-6'}>
          <span className={'font-normal'}>Sắp xếp theo</span>
          <div
            onClick={() => {
              setOrderBy('price');
              setDescending((prev) => !prev);
            }}
          >
            <span className={'mr-2'}>{translate('price')}</span>
            {!descending ? (
              <FontAwesomeIcon icon={faArrowUp}/>
            ) : (
              <FontAwesomeIcon icon={faArrowDown}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

FilterSidebar.propTypes = {
  orderBy: PropTypes.string,
  setOrderBy: PropTypes.func,
  descending: PropTypes.bool,
  setDescending: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
  minPrice: PropTypes.number,
  setMinPrice: PropTypes.func,
  maxPrice: PropTypes.number,
  setMaxPrice: PropTypes.func,
  filterByPrice: PropTypes.func,
  refresh: PropTypes.func,
};

export default FilterSidebar;
