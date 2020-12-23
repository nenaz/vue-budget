import { calculateTerm } from '@/utils/calculator/by-term';

describe('convertMillsecToDays', () => {
  it('24.12.2020 - 12.06.2020 = 195 days', () => {
    const result = calculateTerm(189000, 6, 20000);
    expect({
      monthlyPayment: 19423.37,
      term: 11,
    }).toEqual(result);
  });
});
