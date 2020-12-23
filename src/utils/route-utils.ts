import { Errors } from '@/store/types';

type Params = {
  from?: string;
  status?: number | Errors.CANCELED | Errors.TIMEOUT;
  requestUrl?: string;
  error?: any;
}

// страниы откуда редирект только на main

const CURRENT_TRANCHE_URL_PART = '/transhs/transh/current';

export const redirectToInfoWithParams = (params: Params) => {
  const { from = '/', status = 200, requestUrl = '' } = params;
  const routeParams: any = {};

  if (status === 403) {
    routeParams.name = 'Info';
    routeParams.params = {
      status: Errors.ERROR,
      buttonText: 'Auth',
      backUrl: '/',
    };
  }
  if (status === 404) {
    if (requestUrl && requestUrl.indexOf(CURRENT_TRANCHE_URL_PART) >= 0) {
      console.log('current trunche 404');
    } else {
      routeParams.name = 'Info';
      routeParams.params = {};
    }
  }
  if (status === Errors.CANCELED) {
    routeParams.name = 'Info';
    routeParams.params = {
      status: Errors.ERROR,
      buttonText: 'Попробовать еще раз',
      backUrl: from || '/',
    };
  }
  if (status === Errors.TIMEOUT) {
    routeParams.name = 'Info';
    routeParams.params = {
      status: Errors.ERROR,
      buttonText: 'Попробовать еще раз',
      backUrl: from || '/',
    };
  }
  if (status === 400) {
    routeParams.name = 'Info';
    routeParams.params = {
      status: Errors.ERROR,
      buttonText: 'Попробовать еще раз',
      backUrl: from || '/',
    };
  }
  if (status === 406) {
    routeParams.name = 'Info';
    routeParams.params = {
      status: Errors.ERROR,
      buttonText: 'Попробовать еще раз',
      backUrl: from || '/',
    };
  }
  if (status === 500) {
    routeParams.name = 'Info';
    routeParams.params = {
      status: Errors.ERROR,
      buttonText: 'Попробовать еще раз',
      backUrl: '/',
    };
  }

  return routeParams;
};
