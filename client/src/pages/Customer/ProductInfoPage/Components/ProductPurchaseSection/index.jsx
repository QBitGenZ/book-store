import React, { useState, } from 'react';

const ProductPurchaseSection = () => {
  const [quantity, setQuantity,] = useState(1);
  const price = 168960; // Example price in VND

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className='border rounded-lg p-4 w-80 mx-auto bg-white'>
      {/* Seller Info */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <img
            src='https://frontend.tikicdn.com/_desktop-next/static/img/logo.png'
            alt='Tiki'
            className='h-6 mr-2'
          />
          <span className='font-bold'>Tiki Trading</span>
        </div>
        <div className='flex items-center space-x-1'>
          <span className='text-yellow-500'>⭐</span>
          <span className='text-gray-600 text-sm'>4.7 (5.5tr+ đánh giá)</span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-semibold mb-2'>Số Lượng</label>
        <div className='flex items-center'>
          <button
            onClick={handleDecrement}
            className='px-2 py-1 border border-gray-300 rounded-l focus:outline-none'
          >
                        -
          </button>
          <input
            type='text'
            value={quantity}
            readOnly
            className='w-12 text-center border-t border-b border-gray-300 focus:outline-none'
          />
          <button
            onClick={handleIncrement}
            className='px-2 py-1 border border-gray-300 rounded-r focus:outline-none'
          >
                        +
          </button>
        </div>
      </div>

      {/* Price Section */}
      <div className='mb-4'>
        <span className='block text-gray-500 text-sm'>Tạm tính</span>
        <span className='text-red-500 text-2xl font-bold'>
          {new Intl.NumberFormat('vi-VN').format(price)}₫
        </span>
      </div>

      {/* Buttons */}
      <div className='space-y-3'>
        <button className='bg-red-500 text-white w-full py-2 rounded-lg'>
                    Mua ngay
        </button>
        <button className='border border-blue-500 text-blue-500 w-full py-2 rounded-lg'>
                    Thêm vào giỏ
        </button>
        <button className='border border-blue-500 text-blue-500 w-full py-2 rounded-lg'>
                    Mua trước trả sau
        </button>
      </div>
    </div>
  );
};

export default ProductPurchaseSection;
