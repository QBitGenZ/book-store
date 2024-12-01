import { apiFetch, } from '~/helpers/utils/api';

export const getAllRequestApi = (query) =>
  apiFetch({
    url: 'books',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const getOneRequestApi = (id) =>
  apiFetch({
    url: `books/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const createOneRequestApi = (data) =>
  apiFetch({
    url: 'books/admin/pbook',
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: data,
    },
  });

export const updateOneRequestApi = (id, data) =>
  apiFetch({
    url: `books/admin/${id}`,
    options: {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: data,
    },
  });

export const deleteOneRequestApi = (id) =>
  apiFetch({
    url: `books/admin/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const deleteImageApi = (productId, imageId) => {
  const token = localStorage.getItem('token');

  return apiFetch({
    url: `books/admin/${productId}/images/${imageId}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export const getProductsByType = (id, query) => {
  return apiFetch({
    url: `types/${id}/products`,
    queryParams: query,
  });
};

export const getProductsByAuthorApi = (id, data) => {
  return apiFetch({
    url: `authors/${id}/products`,
    queryParams: data,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};
export const getTopProductsApi = (query) =>
  apiFetch({
    url: 'books/top',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });