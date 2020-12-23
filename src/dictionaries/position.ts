import reduce from 'lodash.reduce';

export const Position = {
  CODES: {
    POSITION_1: {
      SIEBEL: 'Неруководящий работник',
      SCORING: 'POSITION_TYPE_2',
    },
    POSITION_2: {
      SIEBEL: 'Рук./зам.рук. подразделения',
      SCORING: 'POSITION_TYPE_1',
    },
    POSITION_3: {
      SIEBEL: 'Рук./зам.рук. организации',
      SCORING: 'POSITION_TYPE_0',
    },
    POSITION_4: {
      SIEBEL: 'Индивидуальный предприниматель',
      SCORING: 'POSITION_TYPE_3',
    },
    POSITION_5: {
      SIEBEL: 'Другое',
      SCORING: 'POSITION_TYPE_2',
    },
    POSITION_6: {
      SIEBEL: 'Партнер',
      SCORING: 'POSITION_TYPE_0',
    },
    POSITION_7: {
      SIEBEL: 'Руководитель высшего звена',
      SCORING: 'POSITION_TYPE_0',
    },
    POSITION_8: {
      SIEBEL: 'Руководитель среднего звена',
      SCORING: 'POSITION_TYPE_1',
    },
    POSITION_9: {
      SIEBEL: 'Руководитель низшего звена',
      SCORING: 'POSITION_TYPE_1',
    },
    POSITION_10: {
      SIEBEL: 'Высококвалифиц. специалист',
      SCORING: 'POSITION_TYPE_2',
    },
    POSITION_11: {
      SIEBEL: 'Специалист',
      SCORING: 'POSITION_TYPE_2',
    },
    POSITION_12: {
      SIEBEL: 'Служащий',
      SCORING: 'POSITION_TYPE_2',
    },
    POSITION_13: {
      SIEBEL: 'Военнослужащий по контракту',
      SCORING: 'POSITION_TYPE_2',
    },
    POSITION_14: {
      SIEBEL: 'Работник сферы услуг',
      SCORING: 'POSITION_TYPE_2',
    },
    POSITION_15: {
      SIEBEL: 'Рабочий',
      SCORING: 'POSITION_TYPE_2',
    },
  },
} as const;

export const getPositionCodesFromScoring = () => {
  const result: any[] = [];
  return reduce(Position.CODES, (acc, item: any) => {
    acc.push(item.SCORING);
    return acc;
  }, result).sort();
};

export const getPositionCodesFromSiebel = () => {
  const result: any[] = [];
  return reduce(Position.CODES, (acc, item: any) => {
    acc.push(item.SIEBEL);
    return acc;
  }, result).sort();
};
