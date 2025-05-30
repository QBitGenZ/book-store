// import React from 'react';
// import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
// import { faEnvelope,
//   faLocationDot,
//   faPhone, } from '@fortawesome/free-solid-svg-icons';
//
// const Footer = () => {
//   return (
//     <>
//       <div
//         className={
//           'z-40 mx-auto bottom-0 w-full bg-white border border-t-0 shadow mt-2 px-16 pt-8 pb-16 space-x-2'
//         }
//       >
//         <div className={'flex gap-24 justify-around'}>
//           <div>
//             <img
//               className='size-36 object-contain'
//               src={`${process.env.PUBLIC_URL}/assets/pages/other/bookStore.png`}
//               alt='Home'
//             />
//           </div>
//           <div className={'flex flex-col text-left gap-3 italic '}>
//             <div>
//               <span className={'font-bold not-italic'}>Thông tin</span>
//             </div>
//             <div>
//               <FontAwesomeIcon icon={faLocationDot} />
//               <span className={'ml-3'}>
//                 132c/54 Khu vực 2, Ninh Kiều, Cần Thơ
//               </span>
//             </div>
//             <div>
//               <FontAwesomeIcon icon={faEnvelope} />
//               <span className={'ml-3'}>tranb2012159@student.ctu.edu.vn</span>
//             </div>
//             <div>
//               <FontAwesomeIcon icon={faPhone} />
//               <span className={'ml-3'}>0972754762</span>
//             </div>
//           </div>
//           <div className={'flex flex-col text-left gap-3 italic '}>
//             <div>
//               <span className={'font-bold not-italic'}>Chính sách</span>
//             </div>
//             <div>
//               <span className={'ml-3'}>Chính sách bảo mật</span>
//             </div>
//             <div>
//               <span className={'ml-3'}>Chính sách đổi trả</span>
//             </div>
//             <div>
//               <span className={'ml-3'}>Chính sách thanh toán</span>
//             </div>
//           </div>
//           <div className={'flex flex-col text-left gap-3 italic '}>
//             <div>
//               <span className={'font-bold not-italic'}>Liên hệ chúng tôi</span>
//             </div>
//             <div className={'flex flex-row gap-3'}>
//               <img
//                 className='size-20 object-contain'
//                 src={`${process.env.PUBLIC_URL}/assets/pages/other/fb_icon.jpeg`}
//                 alt='Home'
//               />
//               <img
//                 className='size-20 object-contain'
//                 src={`${process.env.PUBLIC_URL}/assets/pages/other/ig_icon.jpeg`}
//                 alt='Home'
//               />
//               <img
//                 className='size-20 object-contain'
//                 src={`${process.env.PUBLIC_URL}/assets/pages/other/tw_icon.jpeg`}
//                 alt='Home'
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
//
// export default Footer;

import React from 'react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone, } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className='z-40 mx-auto bottom-0 w-full bg-white border-t shadow mt-2 px-4 sm:px-8 md:px-16 py-8'>
      <div className='flex flex-col gap-8 md:flex-row justify-around items-start'>
        {/* Logo Section */}
        <div className='flex justify-center md:justify-start'>
          <img
            className='w-36 h-36 object-contain'
            src={`${process.env.PUBLIC_URL}/assets/pages/other/bookStore.png`}
            alt='Home'
          />
        </div>

        {/* Information Section */}
        <div className='flex flex-col text-left gap-3 italic'>
          <h2 className='font-bold not-italic text-lg'>Thông tin</h2>
          <p className='flex items-center'>
            <FontAwesomeIcon icon={faLocationDot} />
            <span className='ml-3'>132c/54 Khu vực 2, Ninh Kiều, Cần Thơ</span>
          </p>
          <p className='flex items-center'>
            <FontAwesomeIcon icon={faEnvelope} />
            <span className='ml-3'>tranb2012159@student.ctu.edu.vn</span>
          </p>
          <p className='flex items-center'>
            <FontAwesomeIcon icon={faPhone} />
            <span className='ml-3'>0972754762</span>
          </p>
        </div>

        {/* Policy Section */}
        <div className='flex flex-col text-left gap-3 italic'>
          <h2 className='font-bold not-italic text-lg'>Chính sách</h2>
          <p>
            <span>Chính sách bảo mật</span>
          </p>
          <p>
            <span>Chính sách đổi trả</span>
          </p>
          <p>
            <span>Chính sách thanh toán</span>
          </p>
        </div>

        {/* Contact Section */}
        <div className='flex flex-col text-left gap-3 italic'>
          <h2 className='font-bold not-italic text-lg'>Liên hệ chúng tôi</h2>
          <div className='flex gap-3'>
            <img
              className='w-8 h-8 object-contain'
              src={`${process.env.PUBLIC_URL}/assets/pages/other/fb_icon.jpeg`}
              alt='Facebook'
            />
            <img
              className='w-8 h-8 object-contain'
              src={`${process.env.PUBLIC_URL}/assets/pages/other/ig_icon.jpeg`}
              alt='Instagram'
            />
            <img
              className='w-8 h-8 object-contain'
              src={`${process.env.PUBLIC_URL}/assets/pages/other/tw_icon.jpeg`}
              alt='Twitter'
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
