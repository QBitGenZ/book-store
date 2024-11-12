import { apiFetch, } from '~/helpers/utils/api';

export const createDonationApi = (data) =>
  apiFetch({
    url: 'donations',
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: data,
    },
  });

export const getAllDonationsApi = (query) =>
  apiFetch({
    url: 'donations',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const getOneDonationApi = (id) =>
  apiFetch({
    url: `donations/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

export const deleteDonationApi = (id) =>
  apiFetch({
    url: `donations/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    },
  });
