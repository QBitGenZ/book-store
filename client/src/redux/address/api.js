import { apiFetch, } from '~/helpers/utils/api';

export const getAllRequestApi = (query) => {
  return apiFetch({
    url: 'addresses',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const getOneRequestApi = (id) =>
  apiFetch({
    url: `addresses/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const createOneApi = (data) =>
  apiFetch({
    url: 'addresses',
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: data,
    },
  });

export const updateOneApi = (id, data) =>
  apiFetch({
    url: `addresses/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      method: 'PUT',
      body: data,
    },
  });

export const deleteOneApi = (id) =>
  apiFetch({
    url: `addresses/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    },
  });
