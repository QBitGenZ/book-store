import React from 'react';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { getTypesByAdminRequestStart, } from '~/redux/productType/slice';
import { getPublishersByAdminRequestStart, } from '~/redux/publisher/slice';
import { getAuthorsByAdminRequestStart, } from '~/redux/author/slice';
import { useDispatch, useSelector, } from 'react-redux';
import { formatDate, } from '~/components/DateFormat';

const ProductInfo = ({ product, }) => {
  const { publishers, } = useSelector((state) => state.publisher);
  const { types, } = useSelector((state) => state.type);
  const { authors, } = useSelector((state) => state.author);

  const dispatch = useDispatch();

  const getTypes = () => {
    dispatch(getTypesByAdminRequestStart());
  };

  const getPublishers = () => {
    dispatch(getPublishersByAdminRequestStart());
  };

  const getAuthors = () => {
    dispatch(getAuthorsByAdminRequestStart());
  };

  React.useEffect(() => {
    getAuthors();
    getTypes();
    getPublishers();
  }, []);

  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-zA-Z0-9-]+/g, '')
      .toLowerCase();
  };

  const hiddenFields = ['_id', '__v', 'images', 'description',];

  const formatProductData = (product) => {
    const formattedProduct = {
      ...product,
    };

    const type = types.find(t => t._id === product?.type);
    if (type) {
      formattedProduct.type = type?.name;
    }

    const publisher = publishers.find(p => p._id === product?.publisher);
    if (publisher) {
      formattedProduct.publisher = publisher.name;
    }

    const author = authors.find(a => a._id === product?.author);
    if (author) {
      formattedProduct.author = author?.fullname;
    }

    if (product?.pubDate)
      formattedProduct.pubDate = formatDate(product?.pubDate);

    return formattedProduct;
  };

  const formattedProduct = formatProductData(product);

  return (
    <>
      <div className={'flex flex-col gap-4'}>{product?.description && (
        <div className='p-6 rounded max-w-full h-auto bg-white shadow-sm'>
          <h2 className='text-xl font-bold mb-4 text-left'>Mô tả sản phẩm</h2>
          <div className={'w-full'}>
            <p className={'text-left break-words hyphens-manual'}>
              {product.description.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br/>
                </span>
              ))}
            </p>
          </div>

        </div>
      )}
      <div className='p-6 rounded max-w-full h-auto bg-white shadow-sm'>
        <h2 className='text-xl font-bold mb-4 text-left'>Thông tin chi tiết</h2>
        <table className='w-full border-collapse'>
          <tbody>
            {Object.entries(formattedProduct).map(([key, value,]) => (
              !hiddenFields.includes(key) && (
                <tr key={key} className='border-b'>
                  <td className='text-left p-2 font-medium text-slate-500'>{translate(toKebabCase(key))}</td>
                  <td className='text-left p-2 w-3/4'>{value}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductInfo;
