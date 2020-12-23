import { formatStringToConvertToDate } from '@/utils/calculator/by-monthly-payment';

describe('formatStringToConvertToDate', () => {
  it('19.06.2020 toEqual 2020-06-19', () => {
    const result = formatStringToConvertToDate('19.06.2020');
    expect('2020-06-19').toEqual(result);
  });
  it('19.06.1950 toEqual 1950-06-19', () => {
    const result = formatStringToConvertToDate('19.06.1950');
    expect('1950-06-19').toEqual(result);
  });
  it('1.06.1950 not.toEqual 1950-06-1', () => {
    const result = formatStringToConvertToDate('1.06.1950');
    expect('1950-06-1').not.toEqual(result);
  });
  it('01.6.1950 not.toEqual 1950-6-01', () => {
    const result = formatStringToConvertToDate('01.6.1950');
    expect('1950-6-01').not.toEqual(result);
  });
  it('01.06.150 not.toEqual 150-06-01', () => {
    const result = formatStringToConvertToDate('01.06.150');
    expect('150-06-01').not.toEqual(result);
  });
  it('1.6.150 not.toEqual 1950-06-19', () => {
    const result = formatStringToConvertToDate('1.6.150');
    expect('1950-06-01').not.toEqual(result);
  });
  it('555555 toEqual 555555', () => {
    const result = formatStringToConvertToDate('555555');
    expect('555555').toEqual(result);
  });
  it('55.66.9999 toEqual 9999-66-55', () => {
    const result = formatStringToConvertToDate('55.66.9999');
    expect('9999-66-55').toEqual(result);
  });
  it('55-66-9999 toEqual 9999-66-55', () => {
    const result = formatStringToConvertToDate('55.66.9999');
    expect('9999-66-55').toEqual(result);
  });
});
