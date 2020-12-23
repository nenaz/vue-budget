import reduce from 'lodash.reduce';

export const TypeOfOwnership = {
  CODES: {
    ORG_TP_1: {
      SIEBEL: 'Государственная комп./учреж.',
      SCORING: 'ORG_TP_STATE_0',
    },
    ORG_TP_2: {
      SIEBEL: 'Частная компания',
      SCORING: 'ORG_TP_STATE_1',
    },
    ORG_TP_3: {
      SIEBEL: 'Индивидуальный предприниматель',
      SCORING: 'ORG_TP_STATE_1',
    },
    ORG_TP_4: {
      SIEBEL: 'Некоммерческая организация',
      SCORING: 'ORG_TP_STATE_1',
    },
    ORG_TP_5: {
      SIEBEL: 'Частная ком. с инос. капиталом',
      SCORING: 'ORG_TP_STATE_1',
    },
  },
} as const;

export const getTypeOfOwnershipCodesFromScoring = () => {
  const result: any[] = [];
  return reduce(TypeOfOwnership.CODES, (acc, item: any) => {
    acc.push(item.SCORING);
    return acc;
  }, result).sort();
};

export const getTypeOfOwnershipCodesFromSiebel = () => {
  const result: any[] = [];
  return reduce(TypeOfOwnership.CODES, (acc, item: any) => {
    acc.push(item.SIEBEL);
    return acc;
  }, result).sort();
};
