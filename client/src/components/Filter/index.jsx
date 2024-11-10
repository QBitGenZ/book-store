import React, { useState, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsByTypeRequestStart, getProductsRequestStart, } from '~/redux/product/slice';
import { getTypesRequestStart, } from '~/redux/productType/slice';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';

function FilterSidebar({ idCategory, }) {
  const { types, } = useSelector((state) => state.type);
  const { products, } = useSelector((state) => state.product);
  const { shop, } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const [orderBy, setOrderBy,] = React.useState('');
  const [descending, setDescending,] = React.useState(true);
  const [page, ,] = React.useState(1);
  const [limit, ,] = React.useState(20);
  const [selectedCategory, setSelectedCategory,] = useState(idCategory || null);

  const [minPrice, setMinPrice,] = useState();
  const [maxPrice, setMaxPrice,] = useState();

  const getProducts = () => {
    dispatch(
      getProductsRequestStart({
        orderBy,
        page,
        limit,
        descending,
        minPrice,
        maxPrice,
      })
    );
  };

  const getProductsByTypes = (id) => {
    dispatch(
      getProductsByTypeRequestStart({
        id,
        meta: {
          orderBy,
          page,
          limit,
          descending,
        },
      })
    );
  };

  const getTypes = () => {
    dispatch(
      getTypesRequestStart({
        limit: 100,
      })
    );
  };

  React.useEffect(() => {
    getProducts();
  }, [orderBy, descending,]);

  React.useEffect(() => {
    getTypes();
  }, [dispatch,]);

  React.useEffect(() => {
    getProductsByTypes(selectedCategory);
  }, [selectedCategory,]);

  console.log(Object.keys(products[0]).map((item) => console.log(item)));

  return (
    <div className='p-4 bg-white rounded-md w-64 text-left shadow-sm'>
      {/* Title */}
      <div className='text-xl font-bold mb-4'>Lọc Theo</div>
      {/* Category Section */}
      <div className='mb-6'>
        <h6
          className='font-normal mb-3'
          onClick={() => {
            setSelectedCategory(null);
            getProducts();
          }}
          style={{
            fontWeight: selectedCategory === null ? 'bold' : 'lighter',
            color: selectedCategory === null ? shop?.accentColor || 'red' : 'inherit',
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
                  fontWeight: selectedCategory === item._id ? 'bold' : 'lighter',
                  color: selectedCategory === item._id ? shop?.accentColor || 'red' : 'inherit',
                }}
                className='ml-1'>
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Order By */}
      <div className='mb-6'>
        <h6
          className='font-normal mb-3'
        >
          {translate('price')}
        </h6>
        <div>
                    Nhập khoảng giá
        </div>
        <div>
          <input onChange={(e) => setMinPrice(e.target.value)}></input>
        </div>
        <div>
          <input onChange={(e) => setMaxPrice(e.target.value)}></input>
        </div>
        <div onClick={getProducts}> Loc</div>

        <div onClick={() => {
          setOrderBy('price');
          setDescending(false);
        }}>
          {translate('price-increase')}
        </div>
      </div>

      {/* /!* Price Section *!/*/}
      {/* <div className='mb-6'>*/}
      {/*  <h6 className='font-normal mb-3'>Giá</h6>*/}
      {/*  <ul className='space-y-2'>*/}
      {/*    {[*/}
      {/*      '0đ - 150,000đ (5091)',*/}
      {/*      '150,000đ - 300,000đ (553)',*/}
      {/*      '300,000đ - 500,000đ (166)',*/}
      {/*      '500,000đ - 700,000đ (34)',*/}
      {/*      '700,000đ Trở Lên (34)',*/}
      {/*    ].map((priceRange, index) => (*/}
      {/*      <li key={index} className='flex items-center'>*/}
      {/*        <input type='checkbox' className='form-checkbox text-red-600'/>*/}
      {/*        <label className='ml-2'>{priceRange}</label>*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*  <div className='mt-4'>*/}
      {/*    <div className='flex items-center gap-2'>*/}
      {/*      <input*/}
      {/*        type='number'*/}
      {/*        className='w-20 p-2 border rounded-md'*/}
      {/*        placeholder='0'*/}
      {/*      />*/}
      {/*      <span>-</span>*/}
      {/*      <input*/}
      {/*        type='number'*/}
      {/*        className='w-20 p-2 border rounded-md'*/}
      {/*        placeholder='0'*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <input type='range' className='w-full mt-3' min='0' max='1000'/>*/}
      {/*  </div>*/}
      {/* </div>*/}

      {/* /!* Brands Section *!/*/}
      {/* <div className='mb-6'>*/}
      {/*  <h2 className='font-semibold mb-3'>Thương Hiệu</h2>*/}
      {/*  <ul className='space-y-2'>*/}
      {/*    {[*/}
      {/*      {*/}
      {/*        name: 'WanLongDa', count: 108,*/}
      {/*      },*/}
      {/*      // Add more brands as needed*/}
      {/*    ].map((brand, index) => (*/}
      {/*      <li key={index} className='flex items-center'>*/}
      {/*        <input type='checkbox' className='form-checkbox text-red-600'/>*/}
      {/*        <label className='ml-2'>{brand.name} ({brand.count})</label>*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/* </div>*/}
    </div>
  );
}

FilterSidebar.propTypes = {
  idCategory: PropTypes.string,
};

export default FilterSidebar;
