import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CustomCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className='w-full h-96 object-cover rounded'
          src={`${process.env.PUBLIC_URL}/assets/pages/other/Carousel_3.webp`}
          alt='Home'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='w-full h-96 object-cover rounded'
          src={`${process.env.PUBLIC_URL}/assets/pages/other/Carousel_1.webp`}
          alt='Home'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='w-full h-96 object-cover rounded'
          src={`${process.env.PUBLIC_URL}/assets/pages/other/Carousel_2.webp`}
          alt='Home'
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CustomCarousel;
