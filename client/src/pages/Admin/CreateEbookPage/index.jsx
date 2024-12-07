import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { MenuItem, TextField, } from '@mui/material';
import { translate, } from '~/helpers';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { useNavigate, } from 'react-router-dom';
import { adminRoutes, } from '~/configs/routes';
import { useDispatch, useSelector, } from 'react-redux';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { getPublishersByAdminRequestStart, } from '~/redux/publisher/slice';
import { getTypesByAdminRequestStart, } from '~/redux/productType/slice';
import { getAuthorsByAdminRequestStart, } from '~/redux/author/slice';
import { createProductRequestStart, } from '~/redux/product/slice';
import { QuiltedImageList, RichTextEditor, } from '~/components';
import { formatDate, } from 'src/helpers';
import { getAllFormatsRequestStart, } from '~/redux/format/slice';

const CreateEbookPage = () => {
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
  // const [imagesSubmit, setImagesSubmit,] = useState([]);
  const [file, setFile,] = useState(null);

  const [isEbook, ] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shop, } = useSelector((state) => state.config);
  const { publishers, } = useSelector((state) => state.publisher);
  const { types, } = useSelector((state) => state.type);
  const { authors, } = useSelector((state) => state.author);
  const { formats, } = useSelector((state) => state.format);
  // const { users, } = useSelector(state => state.user);
  const [limit,] = React.useState(100);
  const [errors, ] = useState({
  });

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

  const handleRemovePhoto = (imageRemoved) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.url !== imageRemoved.img)
    );
  };
  const handleAddImages = (imagesUpload) => {
    if (imagesUpload.length > 0) {
      const newImages = imagesUpload.map((image) => ({
        file: image.file,
        url: URL.createObjectURL(image.file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages,]);
    }
  };

  React.useEffect(() => {
    getTypes();
    getPublishers();
    getAuthors();
    getFormats();
  }, []);

  React.useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, []);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    if (type) formData.append('type', type);
    if (author) formData.append('author', author);
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
    if (images !== []) {
      images?.forEach((image) => {
        formData.append('images', image.file);
      });
    }
    if (file) formData.append('file', file);
    formData.append('isEbook', isEbook);
    formData.append('isShow', true);

    dispatch(createProductRequestStart(formData));

    navigate(adminRoutes.ebook);
  };

  const handleBack = () => {
    navigate(-1);
  };

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
            <h2>{translate('create-product')}</h2>
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
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className='w-100'
            select
            sx={{
              textAlign: 'left',
            }}
            required
            label={translate('product-type-label')}
            size='small'
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
            value={publisher}
            required
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
            value={author}
            required
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
          <TextField
            label={translate('pub-date')}
            size='small'
            name='pubDate'
            type='date'
            value={formatDate(pubDate)}
            onChange={(e) => setPubDate(e.target.value)}
            error={!!errors.pubDate}
            helperText={errors.pubDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
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

          <div className={'text-left'}>
            <RichTextEditor
              content={description}
              setContent={setDescription}
            ></RichTextEditor>
          </div>
          <div hidden={true} className='flex flex-col gap-3'>
            <input
              type='file'
              name='file'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
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
              min: 1,
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
              min: 1,
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
              min: 1,
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
              min: 1,
              step: 1,
            }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
          />
          <QuiltedImageList
            itemData={images.map((image) => ({
              img: image.url,
            }))}
            actions={[
              {
                label: translate('remove-image'),
                func: handleRemovePhoto,
              },
            ]}
            onAddImages={handleAddImages}
          ></QuiltedImageList>
        </div>

      </div>

      <div className='flex flex-row gap-2'>
        <div className={'justify-center w-full flex gap-2'}>
          <Button onClick={handleBack} variant='secondary'>
            {translate('cancel')}
          </Button>
          <Button onClick={handleSubmit} variant='primary'>
            {translate('create')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEbookPage;
