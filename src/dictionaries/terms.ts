import reduce from 'lodash.reduce';

export const Terms = {
  CODES: {
    item1: {
      order: 1,
      title: '12 мес',
      uuid: '12 мес',
    },
    item2: {
      order: 1,
      title: '12 мес',
      uuid: '12 мес',
    },
    item3: {
      order: 1,
      title: '12 мес',
      uuid: '12 мес',
    },
    item4: {
      order: 1,
      title: '12 мес',
      uuid: '12 мес',
    },
    item5: {
      order: 1,
      title: '12 мес',
      uuid: '12 мес',
    },
  },
};

export const getTerms = () => {
  const result: any[] = [];
  return reduce(Terms.CODES, (acc, item: any) => {
    acc.push(item.value);
    return acc;
  }, result).sort();
};
