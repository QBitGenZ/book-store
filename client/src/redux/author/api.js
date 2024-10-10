import { apiFetch, } from '~/helpers/utils/api';

export const getAllRequestApi = (query) => {
  return apiFetch({
    url: 'authors',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const getAllByAdminRequestApi = (query) => {
  return apiFetch({
    url: 'authors/admin',
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
    url: `authors/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const getOneByAdminRequestApi = (id) =>
  apiFetch({
    url: `authors/admin/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const createOneByAdminApi = (data) =>
  apiFetch({
    url: 'authors/admin',
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: data,
    },
  });

export const updateOneByAdminApi = (id, data) =>
  apiFetch({
    url: `authors/admin/${id}`,
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
    url: `authors/admin/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    },
  });
