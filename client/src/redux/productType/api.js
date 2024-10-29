import { apiFetch, } from '~/helpers/utils/api';

export const getAllRequestApi = (query) => {
  return apiFetch({
    url: 'types',
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
    url: 'types/admin',
    queryParams: query,
    options: {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const getOneRequestApi = (id) => apiFetch({
  url: `types/${id}`,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const getOneByAdminRequestApi = (id) => apiFetch({
  url: `types/admin/${id}`,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const createOneByAdminApi = (data) => apiFetch({
  url: 'types/admin',
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'POST',
    body: data,
  },
});

export const updateOneByAdminApi = (id, data) => apiFetch({
  url: `types/admin/${id}`,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'PUT',
    body: data,
  },
});

export const deleteOneByAdminApi = (id) => apiFetch({
  url: `types/admin/${id}`,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'DELETE',
  },
});

// export const getProductsByTypeApi = (id) => apiFetch({
//   url: `types/${id}/products`,
// });