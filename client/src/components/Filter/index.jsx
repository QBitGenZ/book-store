import React from 'react';

const FilterSidebar = () => {
  return (
    <div className='p-4 bg-white rounded-md w-full max-w-xs'>
      {/* Title */}
      <div className='text-xl font-bold text-red-600 mb-4'>Lọc Theo</div>

      {/* Category Section */}
      <div className='mb-6'>
        <h2 className='font-semibold mb-3'>Danh Mục Chính</h2>
        <ul className='space-y-2'>
          {[
            {
              name: 'Sách Tiếng Việt', count: 4599,
            },
            {
              name: 'Văn Phòng Phẩm - Dụng Cụ Học Sinh', count: 687,
            },
            {
              name: 'Đồ Chơi', count: 255,
            },
            {
              name: 'Foreign Books', count: 216,
            },
            {
              name: 'Bách Hóa Tổng Hợp', count: 74,
            },
            {
              name: 'Lưu Niệm', count: 39,
            },
            {
              name: 'Làm Đẹp - Sức Khỏe', count: 2,
            },
            {
              name: 'Sản Phẩm Hồi Sách', count: 1,
            },
          ].map((item, index) => (
            <li key={index} className='flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox text-red-600'
              />
              <label className='ml-2'>{item.name} ({item.count})</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Section */}
      <div className='mb-6'>
        <h2 className='font-semibold mb-3'>Giá</h2>
        <ul className='space-y-2'>
          {[
            '0đ - 150,000đ (5091)',
            '150,000đ - 300,000đ (553)',
            '300,000đ - 500,000đ (166)',
            '500,000đ - 700,000đ (34)',
            '700,000đ Trở Lên (34)',
          ].map((priceRange, index) => (
            <li key={index} className='flex items-center'>
              <input type='checkbox' className='form-checkbox text-red-600'/>
              <label className='ml-2'>{priceRange}</label>
            </li>
          ))}
        </ul>
        <div className='mt-4'>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              className='w-20 p-2 border rounded-md'
              placeholder='0'
            />
            <span>-</span>
            <input
              type='number'
              className='w-20 p-2 border rounded-md'
              placeholder='0'
            />
          </div>
          <input type='range' className='w-full mt-3' min='0' max='1000'/>
        </div>
      </div>

      {/* Brands Section */}
      <div className='mb-6'>
        <h2 className='font-semibold mb-3'>Thương Hiệu</h2>
        <ul className='space-y-2'>
          {[
            {
              name: 'WanLongDa', count: 108,
            },
            // Add more brands as needed
          ].map((brand, index) => (
            <li key={index} className='flex items-center'>
              <input type='checkbox' className='form-checkbox text-red-600'/>
              <label className='ml-2'>{brand.name} ({brand.count})</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
