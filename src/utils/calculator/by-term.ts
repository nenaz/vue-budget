import dayjs from 'dayjs';
import isNaN from 'lodash.isnan';
import { calculateMonthlyPayment } from './by-monthly-payment';

export const firstDemoTerm = (creditAmount: number, monthlyPay: number) => (
  (creditAmount * 0.1) / monthlyPay
);

export const calculateTerm = (creditAmount: number, rate: number, monthlyPay: number) => {
  const firstTerm = firstDemoTerm(creditAmount, monthlyPay);
  const mDate = dayjs();
  const firstMonthlyPayment = calculateMonthlyPayment({
    amount: creditAmount,
    rate,
    monthCount: Math.ceil(firstTerm),
    extradDate: mDate.format('DD.MM.YYYY'),
    payDay: mDate.date(),
    round: 2,
  });
  let iterTerm = Math.ceil(firstTerm);
  let iterMonthlyPayment = firstMonthlyPayment;

  while (Number(iterMonthlyPayment) > monthlyPay) {
    iterTerm += 1;
    iterMonthlyPayment = calculateMonthlyPayment({
      amount: creditAmount,
      rate,
      monthCount: iterTerm,
      extradDate: mDate.format('DD.MM.YYYY'),
      payDay: mDate.date(),
      round: 2,
    });
  }

  return ({
    term: iterTerm,
    monthlyPayment: isNaN(Number(iterMonthlyPayment))
      ? 0.00
      : Number(iterMonthlyPayment),
  });
};
