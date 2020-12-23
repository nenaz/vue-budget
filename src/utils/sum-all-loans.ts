import get from 'lodash.get';

export const sumOfAllLoans = (credits: any[]): number => {
  let sum = 0;
  credits.map((item: any) => {
    sum += get(item, 'amount', 0);
    return false;
  });
  return sum;
};
