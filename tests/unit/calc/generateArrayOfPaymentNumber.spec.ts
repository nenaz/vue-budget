import { generateArrayOfPaymentNumber } from '@/utils/calculator/by-monthly-payment';

describe('generateArrayOfPaymentNumber', () => {
  it('count = 5, array.length = 5', () => {
    const result = generateArrayOfPaymentNumber(5);
    expect(5).toBe(result.length);
  });
  it('count = -5, array.length = 0', () => {
    const result = generateArrayOfPaymentNumber(-5);
    expect(0).toBe(result.length);
  });
  it('count = 0, array.length = 0', () => {
    const result = generateArrayOfPaymentNumber(0);
    expect(0).toBe(result.length);
  });
  it('count = 0, array[0] = undefined', () => {
    const result = generateArrayOfPaymentNumber(0);
    expect(result[0]).toBeUndefined();
  });
  it('count = 5, array.[0] = 1', () => {
    const result = generateArrayOfPaymentNumber(5);
    expect(1).toBe(result[0]);
  });
  it('count = 10, array[9] = 10', () => {
    const count = 10;
    const result = generateArrayOfPaymentNumber(count);
    expect(count).toBe(result[count - 1]);
  });
});
