// import React from 'react';
// import PropTypes from 'prop-types';
//
// function CustomerPagination({
//   currentPage = 1,
//   totalResults = 0,
//   resultsPerPage = 10,
//   onPageChange,
//   pageLimit = 5, // Maximum number of page buttons to display
// }) {
//   if (!totalResults || !resultsPerPage) return null;
//
//   const totalPages = Math.ceil(totalResults / resultsPerPage);
//   const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
//   const endPage = Math.min(totalPages, startPage + pageLimit - 1);
//
//   const handleClick = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page);
//     }
//   };
//
//   return (
//     <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
//       {/* Mobile view */}
//       <div className='flex flex-1 justify-between sm:hidden'>
//         <button
//           onClick={() => handleClick(currentPage - 1)}
//           disabled={currentPage === 1}
//           className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
//         >
//                     Previous
//         </button>
//         <button
//           onClick={() => handleClick(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
//         >
//                     Next
//         </button>
//       </div>
//
//       {/* Desktop view */}
//       <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
//         <div>
//           <p className='text-sm text-gray-700'>
//                         Showing <span className='font-medium'>{(currentPage - 1) * resultsPerPage + 1}</span> to{' '}
//             <span
//               className='font-medium'>{Math.min(currentPage * resultsPerPage, totalResults)}</span> of{' '}
//             <span className='font-medium'>{totalResults}</span> results
//           </p>
//         </div>
//         <div>
//           <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
//             {/* Previous button */}
//             <button
//               onClick={() => handleClick(currentPage - 1)}
//               disabled={currentPage === 1}
//               className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50'
//             >
//               <span className='sr-only'>Previous</span>
//               <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
//                 <path
//                   fillRule='evenodd'
//                   d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
//                   clipRule='evenodd'
//                 />
//               </svg>
//             </button>
//
//             {/* Page numbers */}
//             {Array.from({
//               length: endPage - startPage + 1,
//             }, (_, index) => {
//               const page = startPage + index;
//               return (
//                 <button
//                   key={page}
//                   onClick={() => handleClick(page)}
//                   className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
//                     page === currentPage
//                       ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
//                       : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
//                   } focus:z-20 focus:outline-offset-0`}
//                 >
//                   {page}
//                 </button>
//               );
//             })}
//
//             {/* Ellipsis if there are more pages */}
//             {endPage < totalPages && (
//               <button
//                 className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300'
//                 disabled
//               >
//                                 ...
//               </button>
//             )}
//
//             {/* Next button */}
//             <button
//               onClick={() => handleClick(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50'
//             >
//               <span className='sr-only'>Next</span>
//               <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
//                 <path
//                   fillRule='evenodd'
//                   d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
//                   clipRule='evenodd'
//                 />
//               </svg>
//             </button>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// CustomerPagination.propTypes = {
//   currentPage: PropTypes.number,
//   totalResults: PropTypes.number,
//   resultsPerPage: PropTypes.number,
//   onPageChange: PropTypes.func.isRequired,
//   pageLimit: PropTypes.number,
// };
//
// export default CustomerPagination;

import React from 'react';
import PropTypes from 'prop-types';

const CustomerPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];

    // Add initial pages
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(i);
    }

    // Add ellipsis and last pages if needed
    if (totalPages > 3) {
      if (currentPage > 4) {
        pages[1] = '...';
      }

      if (currentPage > 3 && currentPage < totalPages - 2) {
        pages.push(currentPage);
      }

      if (currentPage < totalPages - 3) {
        pages.push('...');
      }

      // Add last pages
      if (totalPages > 3) {
        for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
          pages.push(i);
        }
      }
    }

    return [...new Set(pages),]; // Remove duplicates
  };

  return (
    <div className='flex items-center justify-center gap-2 my-4'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='text-gray-500 hover:text-gray-700 disabled:opacity-50'
      >
                Previous
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={`${page}-${index}`}
          onClick={() => typeof page === 'number' ? onPageChange(page) : null}
          disabled={page === '...'}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? 'text-blue-600 underline'
              : page === '...'
                ? 'text-gray-500 cursor-default'
                : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='text-gray-500 hover:text-gray-700 disabled:opacity-50'
      >
                Next
      </button>
    </div>
  );
};

CustomerPagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomerPagination;