import { DateTime, DateTimeFormatOptions } from 'luxon';

export const formatUTCDate = (utcDate: string, format = 'LLL dd, yyyy') => {
  const parsedDate = DateTime.fromISO(utcDate, { zone: 'utc' });
  return parsedDate.toFormat(format);
};

export const compareUTCDates = (utcDate1: string, utcDate2: string) => {
  return utcDate1 > utcDate2 ? -1 : 1;
};

export const timeLeftForNextUTCDay = (): number => {
  const now = DateTime.utc();
  const nextUTCDay = now.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).plus({ days: 1 });
  return nextUTCDay.diff(now).as('milliseconds');
};

export const jsDateToString = (date: Date, format = 'yyyy-MM-dd') => {
  return DateTime.fromJSDate(new Date(date)).toFormat(format);
};

export const stringToDateTimeObject = (date: string) => {
  return DateTime.fromISO(date);
};

export const dateOptions: DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

export const dateConversion = (orderDate: string | number | Date, orderTime: string) => {
  return new Date(`${orderDate.toLocaleString().split('T')[0]}T${orderTime}Z`)
    .toLocaleString('en-GB', dateOptions)
    .replace(',', ' -')
    .replace(/\//g, '/');
};
