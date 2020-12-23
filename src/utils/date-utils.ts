import dayjs from 'dayjs';

type Unit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'date'
   | 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms' | 'quarter' | 'Q' | 'week' | 'w' | undefined;

dayjs.locale('ru');

export const diffDatesInDays = (endDate: string, startDate?: string, unit?: Unit): number => {
  const sDate = !!startDate
    ? startDate
    : dayjs();
  const un = !!unit
    ? unit
    : 'day';
  const dateEnd = dayjs(endDate);
  const dateStart = dayjs(sDate);

  return dateEnd.diff(dateStart, un);
};

const tempOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const formatDate = (date: Date, options = tempOptions) => {
  const tempDate = new Date(date);
  const locale = 'ru-RU';

  if (date) {
    return Intl.DateTimeFormat(locale, options).format(tempDate);
  }
  return 'Ошибка';
};

export const dateIsExpired = (date: string) => {
  const nowDate = new Date();
  const expireDate = new Date(date);

  return expireDate.getTime() < nowDate.getTime();
};
