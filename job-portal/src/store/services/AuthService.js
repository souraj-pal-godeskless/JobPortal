import axiosInstance from './AxiosInstance';

export function login(data, token) {
  return axiosInstance.post(`/api/signin`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
