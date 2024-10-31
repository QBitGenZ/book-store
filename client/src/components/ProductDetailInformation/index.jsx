import React from 'react';
import PropTypes from 'prop-types';
import ProductDescription from '~/components/ProductDescription';
import { formatCurrency, } from '~/helpers';
import { getTypesByAdminRequestStart, } from '~/redux/productType/slice';
import { getPublishersByAdminRequestStart, } from '~/redux/publisher/slice';
import { getAuthorsByAdminRequestStart, } from '~/redux/author/slice';
import { useDispatch, useSelector, } from 'react-redux';
import { formatDate, } from 'src/helpers';
import DescriptionList from '~/components/DescriptionList';
import { getUserAllRequestStart, } from '~/redux/user/slice';
import { getAllFormatsRequestStart, } from '~/redux/format/slice';

const ProductDetailInformation = ({ product, hiddenFields, }) => {

  const { publishers, } = useSelector((state) => state.publisher);
  const { types, } = useSelector((state) => state.type);
  const { authors, } = useSelector((state) => state.author);
  const { users, } = useSelector(state => state.user);
  const { formats, } = useSelector(state => state.format);

  const dispatch = useDispatch();

  const getTypes = () => {
    dispatch(getTypesByAdminRequestStart({
      limit: 1000,
    }));
  };

  const getPublishers = () => {
    dispatch(getPublishersByAdminRequestStart({
      limit: 1000,
    }));
  };

  const getAuthors = () => {
    dispatch(getAuthorsByAdminRequestStart({
      limit: 1000,
    }));
  };

  const getDonor = () => {
    dispatch(getUserAllRequestStart({
      limit: 1000,
    }));
  };

  const getFormat = () => {
    dispatch(getAllFormatsRequestStart({
      limit: 1000,
    }));
  };

  React.useEffect(() => {
    getAuthors();
    getTypes();
    getPublishers();
    getDonor();
    getFormat();
  }, []);

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

    const donor = users.find((user) => user._id === product?.donor);
    if (donor)
      formattedProduct.donor = donor.fullname;

    const format = formats.find(a => a._id === product?.format);
    if (format)
      formattedProduct.format = format.name;

    if (product?.pubDate)
      formattedProduct.pubDate = formatDate(product?.pubDate);

    if (product?.price)
      formattedProduct.price = formatCurrency(product?.price);

    if (product?.cost)
      formattedProduct.cost = formatCurrency(product?.cost);

    (hiddenFields || []).forEach((key) => {
      delete formattedProduct[key];
    });

    return formattedProduct;
  };

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <DescriptionList
          title={'product-detail'}
          data={Object.entries(formatProductData(product)).map(([key, value,]) => ({
            label: key,
            value: value,
          }))}
        />

        <ProductDescription
          title={'product-description'}
          data={product?.description}
        />
      </div>

    </>
  );
};

ProductDetailInformation.propTypes = {
  product: PropTypes.object.isRequired,
  hiddenFields: PropTypes.arrayOf(PropTypes.string),

};
export default ProductDetailInformation;

