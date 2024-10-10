import { apiFetch, } from '~/helpers/utils/api';

export const getAllRequestApi = (query) => {
  return apiFetch({
    url: 'carts',
    queryParams: query,
    options: {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const createOneAPi = (data) => {
  return apiFetch({
    url: 'carts',
    options: {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: data,
    },
  });
};

export const updateOneApi = (data) => apiFetch({
  url: 'carts',
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    method: 'PUT',
    body: data,
  },
});

export const deleteOneApi = (data) => apiFetch({
  url: 'carts',
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    method: 'DELETE',
    body: data,
  },
});

export const deleteAllApi = () => apiFetch({
  url: 'carts',
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'DELETE',
  },
});