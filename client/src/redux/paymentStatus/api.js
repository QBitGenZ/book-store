import { apiFetch, } from '~/helpers/utils/api';

export const getAllRequestApi = (query) =>
  apiFetch({
    url: 'payment-statuses',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const getOneRequestApi = (id) =>
  apiFetch({
    url: `payment-statuses/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const createOneRequestApi = (data) =>
  apiFetch({
    url: 'payment-statuses/admin',
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: data,
    },
  });

export const updateOneRequestApi = (id, data) =>
  apiFetch({
    url: `payment-statuses/admin/${id}`,
    options: {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: data,
    },
  });

export const deleteOneRequestApi = (id) =>
  apiFetch({
    url: `payment-statuses/admin/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    },
  });
