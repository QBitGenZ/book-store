import { apiFetch, } from '~/helpers/utils/api';

export const getAllStatistics = () => {
  return apiFetch({
    url: 'statistics',
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const getProductsStatistics = () => {
  return apiFetch({
    url: 'statistics/products',
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const getTypesStatistics = () => {
  return apiFetch({
    url: 'statistics/types',
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const getAuthorsStatistics = () => {
  return apiFetch({
    url: 'statistics/authors',
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export const getPublishersStatistics = () => {
  return apiFetch({
    url: 'statistics/publishers',
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};
