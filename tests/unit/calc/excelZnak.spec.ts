import dayjs from 'dayjs';
import { excelZnak, formatStringToConvertToDate } from '@/utils/calculator/by-monthly-payment';

describe('calculator excelZnak positive numbers', () => {
  it('excelZnak(4, 3) toBe -1', () => {
    const result = excelZnak(4, 3);
    expect(-1).toBe(result);
  });
  it('excelZnak(3, 4) toBe 1', () => {
    const result = excelZnak(3, 4);
    expect(1).toBe(result);
  });
  it('excelZnak(4, 4) toBe 0', () => {
    const result = excelZnak(4, 4);
    expect(0).toBe(result);
  });
});

describe('calculator excelZnak negative numbers', () => {
  it('excelZnak(-5, -15) toBe -1', () => {
    const result = excelZnak(-5, -15);
    expect(-1).toBe(result);
  });
  it('excelZnak(-15, -5) toBe 1', () => {
    const result = excelZnak(-15, -5);
    expect(1).toBe(result);
  });
  it('excelZnak(-15, -15) toBe 0', () => {
    const result = excelZnak(-15, -15);
    expect(0).toBe(result);
  });
});

describe('calculator excelZnak different numbers', () => {
  it('excelZnak(5, -15) toBe -1', () => {
    const result = excelZnak(5, -15);
    expect(-1).toBe(result);
  });
  it('excelZnak(-15, 5) toBe 1', () => {
    const result = excelZnak(-15, 5);
    expect(1).toBe(result);
  });
  it('excelZnak(-5, 5) toBe 1', () => {
    const result = excelZnak(-5, 5);
    expect(1).toBe(result);
  });
  it('excelZnak(0, 5) toBe 1', () => {
    const result = excelZnak(0, 5);
    expect(1).toBe(result);
  });
  it('excelZnak(5, 0) toBe -1', () => {
    const result = excelZnak(5, 0);
    expect(-1).toBe(result);
  });
  it('excelZnak(0, 0) toBe 0', () => {
    const result = excelZnak(0, 0);
    expect(0).toBe(result);
  });
  it('excelZnak(0, -5) toBe -1', () => {
    const result = excelZnak(0, -5);
    expect(-1).toBe(result);
  });
  it('excelZnak(-5, 0) toBe 1', () => {
    const result = excelZnak(-5, 0);
    expect(1).toBe(result);
  });
});

describe('calculator excelZnak momentObj.valueOf()', () => {
  const oneDate = dayjs(formatStringToConvertToDate('12.06.2019'));
  const twoDate = dayjs(formatStringToConvertToDate('20.06.2019'));
  it(`excelZnak(${twoDate}, ${oneDate}) toBe -1`, () => {
    const result = excelZnak(twoDate.valueOf(), oneDate.valueOf());
    expect(-1).toBe(result);
  });
  it(`excelZnak(${oneDate}, ${oneDate}) toBe 1`, () => {
    const result = excelZnak(oneDate.valueOf(), twoDate.valueOf());
    expect(1).toBe(result);
  });
  it(`excelZnak(${twoDate}, ${twoDate}) toBe 0`, () => {
    const result = excelZnak(twoDate.valueOf(), twoDate.valueOf());
    expect(0).toBe(result);
  });
});
