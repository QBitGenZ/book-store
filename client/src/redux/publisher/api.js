import { apiFetch, } from '~/helpers/utils/api';

export const getAllRequestApi = (query) => {
  return apiFetch({
    url: 'publishers',
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
    url: 'publishers/admin',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const createOneByAdminApi = (data) =>
  apiFetch({
    url: 'publishers/admin',
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
    url: `publishers/admin/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const updateOneByAdminApi = (id, data) =>
  apiFetch({
    url: `publishers/admin/${id}`,
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
    url: `publishers/admin/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    },
  });

export const getOneRequestApi = (id) =>
  apiFetch({
    url: `publishers/${id}`,
  });
