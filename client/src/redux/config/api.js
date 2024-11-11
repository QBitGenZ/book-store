import { apiFetch, } from '~/helpers/utils/api';

export const getShopInfoApi = () =>
  apiFetch({
    url: 'config',
    options: {
      method: 'GET',
    },
  });

export const updateShopInfoApi = (data) =>
  apiFetch({
    url: 'config',
    options: {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'PUT',
      body: data,
    },
  });

export const deletePhotoApi = (data) =>
  apiFetch({
    url: 'config/photos',
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
      body: data,
    },
  });
