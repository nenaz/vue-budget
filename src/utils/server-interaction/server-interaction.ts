import axios, { Canceler } from 'axios';
import Cookies from 'js-cookie';
import { SERVICE_NAMES } from './constants';

interface AxiosPostParams {
  url: keyof typeof SERVICE_NAMES;
  headers?: {
    [key: string]: string;
  };
  data?: {
    [key: string]: any;
  };
}

export const { CancelToken } = axios;
// eslint-disable-next-line
export const cancelObj = {
  // eslint-disable-next-line
  cancel: function() {},
};

const logParamsFromUI = (params: AxiosPostParams) => {
  console.group('--> UI -->');
  console.log('HEADERS:', params.headers);
  console.log('%c%s', 'color: blue; font-weight: bold', `URL: ${params.url}`);
  console.log('DATA:', params.data);
  console.groupEnd();
};

const logParamsFromServer = (response: any) => {
  console.group('<-- SERVER <--');
  console.log('RESPONSE: ', response);
  console.log('%c%s', 'color: brown; font-weight: bold', 'DATA: ', response.data);
  console.groupEnd();
};
const logParamsFromServerWithError = (error: any) => {
  console.group('<-- SERVER ERROR <--');
  console.error('ERROR: ', error);
  console.error('ERROR: ', error.response);
  console.groupEnd();
};

const axiosHttpAuth = axios.create({
  // baseURL: process.env.VUE_APP_SERVER_URL_AUTH,
  baseURL: `${process.env.VUE_APP_SERVER_URL}${process.env.VUE_APP_API_BASE_PATH}`,
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosHttp = axios.create({
  baseURL: `${process.env.VUE_APP_SERVER_URL}${process.env.VUE_APP_API_BASE_PATH}`,
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosConfigAPI = (config: any) => ({
  ...config,
  transformRequest: [
    (data: any) => (
      JSON.stringify({
        ...data,
      })
    ),
  ],
});

axiosHttpAuth.interceptors.request.use((config) => axiosConfigAPI(config), (error) => {
  Promise.reject(error);
});

axiosHttp.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    const newHeaders = accessToken
      ? {
        ...config.headers,
        'X-Line-Token': accessToken,
      }
      : config.headers;
    const newConf = {
      ...config,
      headers: {
        ...newHeaders,
      },
    };
    return axiosConfigAPI(newConf);
  },
  (error: any) => Promise.reject(error),
);

export const axiosPostAuth = (params: AxiosPostParams, options?: any) => {
  const { url } = params;
  logParamsFromUI(params);

  return axiosHttpAuth.post(
    `${url}`,
    {
      ...params.data,
    },
    {
      headers: {
        ...params.headers,
      },
      cancelToken: new CancelToken(((c: any) => {
        cancelObj.cancel = c;
      })),
    },
  ).then((response: any) => {
    logParamsFromServer(response);

    return response;
  }).catch((error: any) => {
    logParamsFromServerWithError(error);

    return (options && options.fakeData) || error.response;
  }).finally(() => {});
};

export const axiosPost = (params: AxiosPostParams, options?: any) => {
  const { url } = params;
  logParamsFromUI(params);

  return axiosHttp.post(
    `${url}`,
    {
      ...params.data,
    },
    {
      headers: {
        ...params.headers,
      },
      cancelToken: new CancelToken(((c: any) => {
        cancelObj.cancel = c;
      })),
    },
  ).then((response: any) => {
    logParamsFromServer(response);
    return response;
  }).catch((error: any) => {
    logParamsFromServerWithError(error);
    return (options && options.fakeData) || error.response;
  }).finally(() => {});
};

export const axiosGet = (params: AxiosPostParams, options?: any) => {
  logParamsFromUI(params);

  return axiosHttp.get(
    params.url,
    {
      cancelToken: new CancelToken(((c: any) => {
        cancelObj.cancel = c;
      })),
    },
  ).then((response) => {
    logParamsFromServer(response);
    return response;
  }).catch((error: any) => {
    logParamsFromServerWithError(error);
    return (options && options.fakeData) || error.response;
  }).finally(() => {});
};
