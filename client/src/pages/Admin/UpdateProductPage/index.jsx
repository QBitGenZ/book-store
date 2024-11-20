import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { MenuItem, TextField, } from '@mui/material';
import { translate, } from '~/helpers';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams, } from 'react-router-dom';
import { adminRoutes, } from '~/configs/routes';
import { useDispatch, useSelector, } from 'react-redux';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { getPublishersByAdminRequestStart, } from '~/redux/publisher/slice';
import { getTypesByAdminRequestStart, } from '~/redux/productType/slice';
import { getAuthorsByAdminRequestStart, } from '~/redux/author/slice';
import { deleteImageRequestStart,
  getProductRequestStart,
  updateProductRequestStart, } from '~/redux/product/slice';
import { QuiltedImageList, RichTextEditor, } from '~/components';
import { formatDate, } from 'src/helpers';
import { getAllFormatsRequestStart, } from '~/redux/format/slice';

const UpdateProductPage = () => {
  const { id, } = useParams();
  const [name, setName,] = useState('');
  const [type, setType,] = useState('');
  const [author, setAuthor,] = useState('');
  // const [donor, setDonor,] = useState('');
  const [publisher, setPublisher,] = useState('');
  const [pubDate, setPubDate,] = useState('');
  const [size, setSize,] = useState('');
  const [weight, setWeight,] = useState('');
  const [pageNumber, setPageNumber,] = useState('');
  const [stockQuantity, setStockQuantity,] = useState('');
  const [quantity, setQuantity,] = useState('');
  const [cost, setCost,] = useState('');
  const [price, setPrice,] = useState('');
  const [format, setFormat,] = useState('');
  const [description, setDescription,] = useState('');
  const [images, setImages,] = useState([]);

  const [file, setFile,] = useState(null);

  const [isEbook, setIsEbook,] = useState(false);
  const [errors, setErrors,] = useState({
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shop, } = useSelector((state) => state.config);
  const { publishers, } = useSelector((state) => state.publisher);
  const { types, } = useSelector((state) => state.type);
  const { authors, } = useSelector((state) => state.author);
  const { formats, } = useSelector((state) => state.format);
  const { product, updateSuccess, } = useSelector((state) => state.product);
  // const { users, } = useSelector(state => state.user);

  const [limit,] = React.useState(100);

  const getProduct = () => {
    dispatch(getProductRequestStart(id));
  };

  const getTypes = () => {
    dispatch(
      getTypesByAdminRequestStart({
        limit,
      })
    );
  };

  const getFormats = () => {
    dispatch(
      getAllFormatsRequestStart({
        limit: 1000,
      })
    );
  };

  const getPublishers = () => {
    dispatch(
      getPublishersByAdminRequestStart({
        limit,
      })
    );
  };

  const getAuthors = () => {
    dispatch(
      getAuthorsByAdminRequestStart({
        limit,
      })
    );
  };

  // const getUsers = () => {
  //   dispatch(getUserAllRequestStart({
  //     limit,
  //   }));
  // };

  const handleRemovePhoto = (imageRemoved) => {
    dispatch(
      deleteImageRequestStart({
        id: product._id,
        imageId: imageRemoved?.img?.split('/')[4],
      })
    );
    setImages((prevImage) =>
      prevImage.filter((image) => image !== imageRemoved.img.split('/')[4])
    );
  };

  const handleAddImages = (images) => {
    const form = new FormData();
    if (images !== [])
      images?.forEach((image) => {
        form.append('images', image.file);
      });
    dispatch(
      updateProductRequestStart({
        id: product._id,
        data: form,
      })
    );
  };

  React.useEffect(() => {
    getTypes();
    getPublishers();
    getAuthors();
    getProduct();
    getFormats();
    // getUsers();
  }, []);

  React.useEffect(() => {
    getProduct();
  }, [updateSuccess,]);

  React.useEffect(() => {
    if (product) {
      setName(product.name || '');
      setType(product.type || '');
      setAuthor(product.author || '');
      // setDonor(product.donor || '');
      setPublisher(product.publisher || '');
      setPubDate(product.pubDate || '');
      setSize(product.size || '');
      setWeight(product.weight || '');
      setPageNumber(product.pageNumber || '');
      setStockQuantity(product.stockQuantity || '');
      setQuantity(product.quantity || '');
      setCost(product.cost || '');
      setPrice(product.price || '');
      setFormat(product.format || '');
      setDescription(product.description || '');
      setImages(product.images || []);
      setFile(product.file || null);
      setIsEbook(product.isEbook || false);
    }
  }, [product,]);

  const validate = () => {
    const newErrors = {
    };

    if (!name.trim()) newErrors.name = translate('name-required');
    if (!type) newErrors.type = translate('type-required');
    if (!author) newErrors.author = translate('author-required');
    if (!publisher) newErrors.publisher = translate('publisher-required');
    if (!pubDate) newErrors.pubDate = translate('pubDate-required');
    if (!size) newErrors.size = translate('size-required');
    if (!weight || weight <= 0) newErrors.weight = translate('weight-required');
    if (!pageNumber || pageNumber <= 0) newErrors.pageNumber = translate('pageNumber-required');
    if (stockQuantity === '' || stockQuantity <= 0) newErrors.stockQuantity = translate('stockQuantity-required');
    if (quantity === '' || quantity <= 0) newErrors.quantity = translate('quantity-required');
    if (cost === '' || cost <= 0) newErrors.cost = translate('cost-required');
    if (price === '' || price <= 0) newErrors.price = translate('price-required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const formData = new FormData();
    formData.append('name', name);
    if (type) formData.append('type', type);
    if (author) formData.append('author', author);
    // if (donor) formData.append('donor', donor);
    if (publisher) formData.append('publisher', publisher);
    if (pubDate) formData.append('pubDate', pubDate);
    if (size) formData.append('size', size);
    if (weight) formData.append('weight', weight);
    if (pageNumber) formData.append('pageNumber', pageNumber);
    if (stockQuantity) formData.append('stockQuantity', stockQuantity);
    if (quantity) formData.append('quantity', quantity);
    if (cost) formData.append('cost', cost);
    if (price) formData.append('price', price);
    if (format) formData.append('format', format);
    if (description) formData.append('description', description);
    if (file) formData.append('file', file);
    formData.append('isEbook', isEbook);
    dispatch(
      updateProductRequestStart({
        id: id,
        data: formData,
      })
    );
    navigate(adminRoutes.product);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  // };

  return (
    <div className={'flex flex-col gap-3'}>
      <div className='grid grid-cols-3 gap-3'>
        <div className={'relative'}>
          <div
            className='absolute inset-y-0 left-0 place-content-center'
            onClick={handleBack}
            style={{
              color: shop?.accentColor,
            }}
          >
            <FontAwesomeIcon className='left-0 inset-y-0' icon={faArrowLeft} />
          </div>
        </div>
        <div>
          <div className={'place-content-center'}>
            <h2>{translate('update-product')}</h2>
          </div>
        </div>
        <div></div>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <div className='flex flex-col gap-3'>
          <TextField
            className='w-100'
            required
            label={translate('name')}
            name='name'
            size='small'
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            className='w-100'
            select
            sx={{
              textAlign: 'left',
            }}
            label={translate('product-type-label')}
            size='small'
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            error={!!errors.type}
            helperText={errors.type}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              },
            }}
          >
            {types?.map((type) => (
              <MenuItem key={type._id} value={type._id}>
                {type.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className='w-100'
            select
            sx={{
              textAlign: 'left',
            }}
            label={translate('publisher-label')}
            size='small'
            required
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            error={!!errors.publisher}
            helperText={errors.publisher}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              },
            }}
          >
            {publishers?.map((publisher) => (
              <MenuItem key={publisher._id} value={publisher._id}>
                {publisher.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className='w-100'
            select
            sx={{
              textAlign: 'left',
            }}
            label={translate('author-label')}
            size='small'
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            error={!!errors.author}
            helperText={errors.author}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              },
            }}
          >
            {authors?.map((author) => (
              <MenuItem key={author._id} value={author._id}>
                {author.fullname}
              </MenuItem>
            ))}
          </TextField>
          {/* <TextField */}
          {/*  className='w-100'*/}
          {/*  select*/}
          {/*  sx={{*/}
          {/*    textAlign: 'left',*/}
          {/*  }}*/}
          {/*  label={translate('donor-label')}*/}
          {/*  size='small'*/}
          {/*  value={donor}*/}
          {/*  onChange={(e) => setDonor(e.target.value)}*/}
          {/*  SelectProps={{*/}
          {/*    MenuProps: {*/}
          {/*      PaperProps: {*/}
          {/*        style: {*/}
          {/*          maxHeight: 200,*/}
          {/*        },*/}
          {/*      },*/}
          {/*    },*/}
          {/*  }}*/}
          {/* > */}
          {/*  {users?.map((user) => (*/}
          {/*    <MenuItem key={user._id} value={user._id}>*/}
          {/*      {user.fullname}*/}
          {/*    </MenuItem>*/}
          {/*  ))}*/}
          {/* </TextField>*/}
          <TextField
            label={translate('pub-date')}
            size='small'
            name='pubDate'
            type='date'
            required
            value={formatDate(pubDate)}
            onChange={(e) => setPubDate(e.target.value)}
            error={!!errors.pubDate}
            helperText={errors.pubDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* <TextField*/}
          {/*  label={translate('format')}*/}
          {/*  size='small'*/}
          {/*  name='format'*/}
          {/*  value={format}*/}
          {/*  onChange={(e) => setFormat(e.target.value)}*/}
          {/* />*/}
          <TextField
            className='w-100'
            select
            sx={{
              textAlign: 'left',
            }}
            label={translate('format-label')}
            size='small'
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              },
            }}
          >
            {formats?.map((format) => (
              <MenuItem key={format._id} value={format._id}>
                {format.name}
              </MenuItem>
            ))}
          </TextField>

          {/* <TextField*/}
          {/*  label={translate('description')}*/}
          {/*  size='small'*/}
          {/*  name='description'*/}
          {/*  value={description}*/}
          {/*  onChange={(e) => setDescription(e.target.value)}*/}
          {/*  multiline*/}
          {/*  rows={4}*/}
          {/* />*/}
          <div className={'text-left'}>
            {/* {translate('description')}*/}
            <RichTextEditor
              content={description}
              setContent={setDescription}
            ></RichTextEditor>
            <div hidden={true} className='flex flex-col gap-3'>
              <input
                type='file'
                name='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          {/* <FormControlLabel*/}
          {/*  control={*/}
          {/*    <Checkbox*/}
          {/*      checked={isEbook}*/}
          {/*      onChange={(e) => setIsEbook(e.target.checked)}*/}
          {/*      name='isEbook'*/}
          {/*    />*/}
          {/*  }*/}
          {/*  label={translate('is-ebook')}*/}
          {/* />*/}
        </div>

        <div className='flex flex-col gap-3'>
          <TextField
            label={translate('size')}
            size='small'
            name='size'
            required
            value={size}
            onChange={(e) => setSize(e.target.value)}
            error={!!errors.size}
            helperText={errors.size}
          />

          <TextField
            label={translate('weight')}
            size='small'
            name='weight'
            type='number'
            required
            inputProps={{
              min: 0,
              step: 1,
            }}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            error={!!errors.weight}
            helperText={errors.weight}
          />

          <TextField
            label={translate('page-number')}
            size='small'
            name='pageNumber'
            type='number'
            required
            inputProps={{
              min: 1,
              step: 1,
            }}
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
            error={!!errors.pageNumber}
            helperText={errors.pageNumber}
          />

          <TextField
            label={translate('stock-quantity')}
            size='small'
            name='stockQuantity'
            type='number'
            required
            inputProps={{
              min: 0,
              step: 1,
            }}
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            error={!!errors.stockQuantity}
            helperText={errors.stockQuantity}
          />

          <TextField
            label={translate('quantity')}
            size='small'
            name='quantity'
            type='number'
            required
            inputProps={{
              min: 0,
              step: 1,
            }}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />

          <TextField
            label={translate('cost')}
            size='small'
            name='cost'
            type='number'
            required
            inputProps={{
              min: 0,
              step: 1,
            }}
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            error={!!errors.cost}
            helperText={errors.cost}
          />
          <TextField
            label={translate('price')}
            size='small'
            name='price'
            type='number'
            required
            inputProps={{
              min: 0,
              step: 1,
            }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
          />
          <QuiltedImageList
            itemData={images?.map((value) => ({
              img: `${process.env.REACT_APP_HOST_IP}/${value}`,
            }))}
            actions={[
              {
                label: translate('remove-image'),
                func: handleRemovePhoto,
              },
            ]}
            onAddImages={handleAddImages}
          />
        </div>
      </div>

      <div className='flex flex-row gap-2'>
        <div className={'justify-center w-full flex gap-2'}>
          <Button onClick={handleBack} variant='secondary'>
            {translate('cancel')}
          </Button>
          <Button onClick={handleSubmit} variant='primary'>
            {translate('update')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
