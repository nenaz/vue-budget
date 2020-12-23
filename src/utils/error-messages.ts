import { Errors } from '@/store/types';

type ErrorsString = keyof typeof Errors;

export const ErrorMessages = (types: ErrorsString[]) => {
  const messages = types.map((item: ErrorsString) => Errors[item]);
  return messages;
};

const errorMessage = (value: string) => {
  console.log('value', value);
  return Number(value)
    ? ''
    : 'Error message';
};

export default {
  errorMessage,
};
