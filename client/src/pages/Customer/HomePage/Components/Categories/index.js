import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getTypesByAdminRequestStart, } from '~/redux/productType/slice';
import { useNavigate, } from 'react-router-dom';
import { clientRoutes, } from '~/configs/routes';

function Categories() {
  const { types, type, } = useSelector(state => state.type);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page,] = React.useState(1);
  const [limit,] = React.useState(100);
  React.useEffect(() => {
    dispatch(getTypesByAdminRequestStart({
      orderBy,
      page,
      limit,
      descending,
    }));
  }, [dispatch, type,]);

  const handleClick = (category) => {
    navigate(clientRoutes.categories.replace(':id', category._id));
  };

  return (

    <div className='p-4 rounded-lg shadow-sm bg-white'>
      <h2 className='text-lg text-left font-bold pb-2 mb-4 border-b'>Danh mục sản phẩm</h2>
      <div className='flex flex-row flex-wrap gap-3'>
        {types?.map((category, index) => (
          <div key={index}
            className='flex flex-col items-center text-center p-4'
            onClick={() => handleClick(category)}
          >
            <img src={`${process.env.REACT_APP_HOST_IP}/${category.image}`} alt={category.name}
              className='w-16 h-16 object-contain'/>
            <span className='text-sm font-medium'>{category.name}</span>
          </div>
        ))}
      </div>
    </div>

  );

}

export default Categories;