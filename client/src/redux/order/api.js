import { apiFetch, } from '~/helpers';

export const getAllRequestApi = (query) => {
  return apiFetch({
    url: 'orders',
    queryParams: query,
    options: {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const getAllByAdminRequestApi = (query) => {
  return apiFetch({
    url: 'orders/admin',
    queryParams: query,
    options: {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const createOneRequestApi = (data) => {
  return apiFetch({
    url: 'orders',
    options: {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: data,
    },
  });
};

export const updateOneRequestApi = (id, data) => {
  return apiFetch({
    url: `orders/${id}`,
    options: {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'PUT',
      body: data,
    },
  });
};