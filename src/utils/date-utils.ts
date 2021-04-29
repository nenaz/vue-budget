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

export const formatDDMMYYYtoYYYYMMDD = (date: string) => date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3/$2/$1');

export const getOffsetTime = (date: Date) => {
  const TIME = 60 * 1000;
  return date.getTimezoneOffset() * TIME;
};

export const dateFormattingFromDDMMYYYtoYYYYMMDDwithTimezone = (dateStr: string) => {
  const formatStr = formatDDMMYYYtoYYYYMMDD(dateStr);
  const tempDate = new Date(formatStr);
  const tempTime = getOffsetTime(tempDate) >= 0
    ? tempDate.getTime() + getOffsetTime(tempDate)
    : tempDate.getTime() - getOffsetTime(tempDate);
  const dateInt = tempDate.setTime(tempTime);
  const resultDate = new Date(dateInt).toISOString();
  return resultDate;
};
