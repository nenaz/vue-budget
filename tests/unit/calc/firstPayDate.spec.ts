import { firstPayDate } from '@/utils/calculator/by-monthly-payment';

describe('firstPayDate', () => {
  it('firstPayDate', () => {
    const result = firstPayDate('30.06.2020', 5);
    expect('05.08.2020').toBe(result.format('DD.MM.YYYY'));
  });
});
