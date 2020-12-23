import { generateArrayOfDuration } from '@/utils/calculator/by-monthly-payment';

describe('generateArrayOfDuration extdate < paydate', () => {
  const extradDate = '01.07.2020';
  const startDate = '08.07.2020';
  it(`count = 3, ${extradDate}, ${startDate}`, () => {
    const mockArray = [7, 31, 31];
    const result = generateArrayOfDuration(3, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
  it(`count = 6, ${extradDate}, ${startDate}`, () => {
    const mockArray = [7, 31, 31, 30, 31, 30];
    const result = generateArrayOfDuration(6, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
  it(`count = 10, ${extradDate}, ${startDate}`, () => {
    const mockArray = [7, 31, 31, 30, 31, 30, 31, 31, 28, 31];
    const result = generateArrayOfDuration(10, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
  it(`count = 12, ${extradDate}, ${startDate}`, () => {
    const mockArray = [7, 31, 31, 30, 31, 30, 31, 31, 28, 31, 30, 31];
    const result = generateArrayOfDuration(12, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
});

describe('generateArrayOfDuration end month', () => {
  const extradDate = '26.07.2020';
  const startDate = '30.07.2020';
  it(`count = 3, ${extradDate}, ${startDate}`, () => {
    const mockArray = [4, 31, 31];
    const result = generateArrayOfDuration(3, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
  it(`count = 6, ${extradDate}, ${startDate}`, () => {
    const mockArray = [4, 31, 31, 30, 31, 30];
    const result = generateArrayOfDuration(6, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
  it(`count = 10, ${extradDate}, ${startDate}`, () => {
    const mockArray = [4, 31, 31, 30, 31, 30, 31, 29, 30, 31];
    const result = generateArrayOfDuration(10, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
  it(`count = 12, ${extradDate}, ${startDate}`, () => {
    const mockArray = [4, 31, 31, 30, 31, 30, 31, 29, 30, 31, 30, 31];
    const result = generateArrayOfDuration(12, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
});
describe('generateArrayOfDuration extday > payday', () => {
  const extradDate = '30.07.2020';
  const startDate = '05.08.2020';
  it(`count = 3, ${extradDate}, ${startDate}`, () => {
    const mockArray = [6, 31, 30];
    const result = generateArrayOfDuration(3, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
  it(`count = 6, ${extradDate}, ${startDate}`, () => {
    const mockArray = [6, 31, 30, 31, 30, 31];
    const result = generateArrayOfDuration(6, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
  it(`count = 10, ${extradDate}, ${startDate}`, () => {
    const mockArray = [6, 31, 30, 31, 30, 31, 31, 28, 31, 30];
    const result = generateArrayOfDuration(10, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
  it(`count = 12, ${extradDate}, ${startDate}`, () => {
    const mockArray = [6, 31, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30];
    const result = generateArrayOfDuration(12, extradDate, startDate);
    expect(mockArray).toEqual(result);
  });
});
