import { apiFetch, } from '~/helpers';

const getAllFormatsApi = (query) => {
  return apiFetch({
    url: 'formats',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export { getAllFormatsApi, };
