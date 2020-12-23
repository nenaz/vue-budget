import { FAKE_RESPONSE_DEFAULT_TIME } from './constants';

export const fakeResponse = (fakeData?: any) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeData);
    }, FAKE_RESPONSE_DEFAULT_TIME);
  })
);
