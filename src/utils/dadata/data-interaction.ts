import axios from 'axios';

const axiosHttp = axios.create({
  baseURL: process.env.VUE_APP_DADATA_BASE_URL,
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Token ${process.env.VUE_APP_DADATA_KEY}`,
  },
});

export const promptRequest = (params: any) => {
  const url = params.url || 'address';
  const data = {
    query: params.query,
    count: 10,
    language: 'ru',
  };

  return axiosHttp.post(
    `${url}`,
    {
      ...data,
    },
  ).then((response: any) => response);
};
