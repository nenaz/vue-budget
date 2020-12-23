import reduce from 'lodash.reduce';

export const TypeOfDirectionActivity = {
  CODES: {
    ORG_TP_1: {
      SIEBEL: 'Адм-хоз. и трансп. службы',
      SCORING: 'RGB_JOB_DIR_6',
    },
    ORG_TP_2: {
      SIEBEL: 'Бухгалтерия, финансы, планир.',
      SCORING: 'RGB_JOB_DIR_2',
    },
    ORG_TP_3: {
      SIEBEL: 'Вспомогательный техперсонал',
      SCORING: 'RGB_JOB_DIR_4',
    },
    ORG_TP_4: {
      SIEBEL: 'Кадровая служба и секретариат',
      SCORING: 'RGB_JOB_DIR_8',
    },
    ORG_TP_5: {
      SIEBEL: 'Пр-техн. обесп. и телеком.',
      SCORING: 'RGB_JOB_DIR_3',
    },
    ORG_TP_6: {
      SIEBEL: 'Реклама и маркетинг',
      SCORING: 'RGB_JOB_DIR_5',
    },
    ORG_TP_7: {
      SIEBEL: 'Служба безопасности',
      SCORING: 'RGB_JOB_DIR_10',
    },
    ORG_TP_8: {
      SIEBEL: 'Снабжение и сбыт',
      SCORING: 'RGB_JOB_DIR_7',
    },
    ORG_TP_9: {
      SIEBEL: 'Участие в основ. деятельности',
      SCORING: 'RGB_JOB_DIR_1',
    },
    ORG_TP_10: {
      SIEBEL: 'Юридическая служба',
      SCORING: 'RGB_JOB_DIR_9',
    },
  },
} as const;

export const getTypeOfDirectionActivityCodesFromScoring = () => {
  const result: any[] = [];
  return reduce(TypeOfDirectionActivity.CODES, (acc, item: any) => {
    acc.push(item.SCORING);
    return acc;
  }, result).sort();
};

export const getTypeOfDirectionActivityCodesFromSiebel = () => {
  const result: any[] = [];
  return reduce(TypeOfDirectionActivity.CODES, (acc, item: any) => {
    acc.push(item.SIEBEL);
    return acc;
  }, result).sort();
};
