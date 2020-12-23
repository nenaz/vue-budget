import dayjs from 'dayjs';
import { convertMillsecToDays, formatStringToConvertToDate } from '@/utils/calculator/by-monthly-payment';

describe('convertMillsecToDays', () => {
  it('24.12.2020 - 12.06.2020 = 195 days', () => {
    const oneDate = dayjs(formatStringToConvertToDate('12.06.2020'));
    const twoDate = dayjs(formatStringToConvertToDate('24.12.2020'));
    const result = convertMillsecToDays(twoDate.valueOf() - oneDate.valueOf());
    expect(195).toBe(result);
  });
  it('12.06.2020 - 24.12.2020 = 195 days', () => {
    const oneDate = dayjs(formatStringToConvertToDate('12.06.2020'));
    const twoDate = dayjs(formatStringToConvertToDate('24.12.2020'));
    const result = convertMillsecToDays(oneDate.valueOf() - twoDate.valueOf());
    expect(195).toBe(result);
  });
  it('12.06.2020 - 12.06.2020 = 0 days', () => {
    const oneDate = dayjs(formatStringToConvertToDate('12.06.2020'));
    const result = convertMillsecToDays(oneDate.valueOf() - oneDate.valueOf());
    expect(0).toBe(result);
  });
  it('150005655 = 1 days', () => {
    const result = convertMillsecToDays(150005655);
    expect(1).toBe(result);
  });
  it('-150005655 = 1 days', () => {
    const result = convertMillsecToDays(-150005655);
    expect(1).toBe(result);
  });
  it('15000565500 = 173 days', () => {
    const result = convertMillsecToDays(15000565500);
    expect(173).toBe(result);
  });
  it('-8915000 = 0 days', () => {
    const result = convertMillsecToDays(-8915000);
    expect(0).toBe(result);
  });
  it('-8915000 not -0 days', () => {
    const result = convertMillsecToDays(-8915000);
    expect(-0).not.toBe(result);
  });
});
