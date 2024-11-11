import { apiFetch, } from '~/helpers';

export const getAllRequestApi = (query) => {
  return apiFetch({
    url: 'accounts',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const getAllAdminRequestApi = (query) => {
  return apiFetch({
    url: 'accounts/admin',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const createOneByAdminRequestApi = (data) =>
  apiFetch({
    url: 'accounts/admin',
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: data,
    },
  });

export const getOneByAdminRequestApi = (id) =>
  apiFetch({
    url: `accounts/admin/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const updateOneByAdminApi = (id, data) =>
  apiFetch({
    url: `accounts/admin/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'PUT',
      body: data,
    },
  });

export const deleteOneByAdminApi = (id) =>
  apiFetch({
    url: `accounts/admin/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    },
  });

export const getOneRequestApi = (id) =>
  apiFetch({
    url: `accounts/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const updateOneApi = (id, data) =>
  apiFetch({
    url: `accounts/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'PUT',
      body: data,
    },
  });

export const deleteOneApi = (id) =>
  apiFetch({
    url: `accounts/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    },
  });
