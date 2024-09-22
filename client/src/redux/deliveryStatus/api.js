import { apiFetch, } from '~/helpers/utils/api';

export const getAllRequestApi = (query) => apiFetch({
  url: 'delivery-statuses',
  queryParams: query,
  options: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const getOneRequestApi = (id) => apiFetch({
  url: `delivery-statuses/${id}`,
  options: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const createOneRequestApi = (data) => apiFetch({
  url: 'delivery-statuses/admin',
  options: {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: data,
  },
});

export const updateOneRequestApi = (id, data) => apiFetch({
  url: `delivery-statuses/admin/${id}`,
  options: {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: data,
  },
});

export const deleteOneRequestApi = (id) => apiFetch({
  url: `delivery-statuses/admin/${id}`,
  options: {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  },
});