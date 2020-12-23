// формула расчета
// ((rate / 100 / 12 * amount) / (1 - (1 + rate / 100 / 12)**(-term)) * term) - amount
export const overpayment = (
  creditAmount: number,
  rate: number,
  monthCOunt: number,
): string => {
  const rate12 = rate / 100 / 12;
  const step1 = (1 + rate12) ** (-monthCOunt);
  const step2 = (rate12 * creditAmount);
  const step3 = step2 / (1 - step1);
  const over = (step3 * monthCOunt) - creditAmount;
  return over.toFixed(2);
};
