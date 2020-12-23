import dayjs from 'dayjs';
import {
  generateArrayOfPaymentDate,
  formatStringToConvertToDate,
} from '@/utils/calculator/by-monthly-payment';

describe('generateArrayOfPaymentDate', () => {
  const date = '12.06.2020';
  it('count = 2, array.length = 2', () => {
    const count = 2;
    const result = generateArrayOfPaymentDate(count, date);
    expect(count).toEqual(result.length);
  });
  it('count = -2, array.length = 0', () => {
    const count = -2;
    const result = generateArrayOfPaymentDate(count, date);
    expect(0).toEqual(result.length);
  });
  it('count = 0, array.length = 0', () => {
    const count = 0;
    const result = generateArrayOfPaymentDate(count, date);
    expect(count).toEqual(result.length);
  });
  it('count = 2, mockArray isEquall result', () => {
    const count = 2;
    const result = generateArrayOfPaymentDate(count, date);
    const mockResult = [
      dayjs(formatStringToConvertToDate(date)).add(0, 'month'),
      dayjs(formatStringToConvertToDate(date)).add(1, 'month'),
    ];
    expect(mockResult).toEqual(result);
  });
  it('count = 2, mockArray format(DD.MM.YYYY) isEqual result.format(DD.MM.YYYY)', () => {
    const count = 2;
    const result = generateArrayOfPaymentDate(count, date);
    expect(date).toEqual(result[0].format('DD.MM.YYYY'));
    expect('12.07.2020').toEqual(result[1].format('DD.MM.YYYY'));
  });
});
