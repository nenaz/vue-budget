import dayjs from 'dayjs';

interface MonthlyPaymentParams {
  amount: number;
  rate: number;
  monthCount: number;
  extradDate: string;
  payDay: number;
  round: number;
}

export const excelZnak = (a: number, b: number) => {
  const res = b - a;
  if (res > 0) {
    return 1;
  }
  if (res === 0) {
    return 0;
  }
  return -1;
};

export const formatStringToConvertToDate = (value: string) => value.replace(/(\d{2}).(\d{2}).(\d{4})/g, '$3-$2-$1');

export const convertMillsecToDays = (value: number) => (
  Math.abs(Math.trunc(value / 1000 / 60 / 60 / 24))
);

// Номер платежа
export const generateArrayOfPaymentNumber = (count: number) => (
  Array.from({ length: count }).map((item, key) => key + 1)
);

// даты платежа
export const generateArrayOfPaymentDate = (count: number, startDate: string) => (
  Array.from({ length: count }).map((item, key) => (
    dayjs(formatStringToConvertToDate(startDate)).add(key, 'month')
  ))
);

export const generateArrayOfDuration = (count: number, extradDate: string, startDate: string) => {
  const res = [];
  const exDate = dayjs(formatStringToConvertToDate(extradDate));
  const paymentDates = generateArrayOfPaymentDate(count, startDate);
  for (let i = 0; i < count; i += 1) {
    if (i !== 0) {
      res.push(convertMillsecToDays(paymentDates[i].valueOf() - paymentDates[i - 1].valueOf()));
    } else {
      res.push(convertMillsecToDays(paymentDates[i].valueOf() - exDate.valueOf()));
    }
  }
  return res;
};

export const firstPayDate = (
  startDate: string,
  payDay: number,
) => {
  // дата выдачи в формате yyyy-mm-dd (2020-06-30)
  const startDateWithFormat = formatStringToConvertToDate(startDate);
  // дата выдачи в формате dayjs
  const startDateAsDate = dayjs(startDateWithFormat);
  // дата выдачи + 1 мес
  const startDateAsDateAddMonth = dayjs(startDateAsDate).add(1, 'month');
  // дата предполагаемого первого платежа YYYY-MM-DD  (05.07.2020)
  // +1 для правильной конвертации месяца в строку
  const firstPaymentDate = `${startDateAsDateAddMonth.year()}-${
    startDateAsDateAddMonth.month() + 1}-${payDay}`;
  // дата предполагаемого первого платежа в формате dayjs
  const firstPaymentDateAsDate = dayjs(firstPaymentDate);
  // вычисление знака операции (второй парам больше = 1, меньне = -1, равны = 0)
  const tempZnak = excelZnak(startDateAsDate.valueOf(), firstPaymentDateAsDate.valueOf());
  // разнича в миллисек между firstPaymentDateAsDate и startDateAsDate
  const millisec = firstPaymentDateAsDate.valueOf() - startDateAsDate.valueOf();
  // флаг, разница в миллисек * на знак операции > 10
  const isMoreThen10 = (tempZnak * (convertMillsecToDays(millisec))) > 10;
  //  даты выдачи + 2 мес
  const startDateAsDateAddTwoMonth = dayjs(formatStringToConvertToDate(startDate)).add(2, 'month');
  // дата предполагаемого первого платежа, более поздняя YYYY-MM-DD  05.08.2020
  // +1 для правильной конвертации месяца в строку
  const firstPaymentDateLater = `${startDateAsDateAddMonth.year()}-${
    startDateAsDateAddTwoMonth.month() + 1}-${payDay}`;
  // дата предполагаемого первого платежа, более поздняя, в формате dayjs
  const firstPaymentDateLaterAsDate = dayjs(firstPaymentDateLater);
  // если разница между датой одобрения и датой первого платежа, больше 10 дней
  // то вернуть дату выдачи + 1 мес с днем платежа,
  // иначе вернуть дату выдачи + 2 мес с днем платежа
  const calulatedFirstPaymentDate = isMoreThen10
    ? firstPaymentDateAsDate
    : firstPaymentDateLaterAsDate;

  return calulatedFirstPaymentDate;
};

export const getSomeCoefficient = (
  count: number,
  extradDate: string,
  startDate: string,
  rate: number,
) => {
  const arrSomeCoef = [];
  const arrDurations = generateArrayOfDuration(count, extradDate, startDate);
  const arrPaymentNums = generateArrayOfPaymentNumber(count);
  for (let i = 0; i < count; i += 1) {
    if (i < 6) {
      arrSomeCoef.push(((arrDurations[i] / 365) * (rate / 100)) + 1);
    } else {
      const result = arrPaymentNums[i] <= count
        ? ((arrDurations[i] / 365) * (rate / 100)) + 1
        : 0;
      arrSomeCoef.push(result);
    }
  }
  return arrSomeCoef;
};

export const calcProductNumbers = (arr: number[], from = 0) => {
  let prod = 1;
  for (let i = arr.length - 1; i > from; i -= 1) {
    prod *= arr[i];
  }
  return prod;
};

export const calcSumNumbers = (arr: number[]) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i += 1) {
    sum += arr[i] * 10000;
  }
  return sum / 10000;
};

export const getProCoefficient = (
  count: number,
  extradDate: string,
  startDate: string,
  rate: number,
) => {
  const arrProCoef = [];
  const arrPaymentNums = generateArrayOfPaymentNumber(count);
  const arrSomeC = getSomeCoefficient(count, extradDate, startDate, rate);
  // console.log('arrPaymentNums', arrPaymentNums);
  // console.log('arrSomeC', arrSomeC);
  for (let i = 0; i < count - 1; i += 1) {
    if (arrPaymentNums[i] === count) {
      arrProCoef.push(1);
    } else {
      arrProCoef.push(calcProductNumbers(arrSomeC, i));
    }
  }
  return arrProCoef;
};

export const calculateMonthlyPayment = (params: MonthlyPaymentParams): string => {
  const {
    amount,
    rate,
    monthCount,
    extradDate,
    payDay,
    round = 2,
  } = params;
  const sd = firstPayDate(extradDate, payDay);
  const arrPro = getProCoefficient(monthCount, extradDate, sd.format('DD.MM.YYYY'), rate);
  const arrSomeC = getSomeCoefficient(monthCount, extradDate, sd.format('DD.MM.YYYY'), rate);
  const sumArrPro = calcSumNumbers(arrPro);
  const prodArrSomeC = calcProductNumbers(arrSomeC, -1);
  // console.log('arrPro', arrPro);
  // console.log('sumArrPro', sumArrPro);
  // console.log('prodArrSomeC', prodArrSomeC);
  const before = amount * (prodArrSomeC);
  const after = (0 + sumArrPro);
  const result = before / after;
  return result.toFixed(round);
};
