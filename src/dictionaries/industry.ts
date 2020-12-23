import reduce from 'lodash.reduce';

export const Industry = {
  CODES: {
    RGB_INDUSTRY_1: {
      SIEBEL: 'Банк/Финансы',
      SCORING: 'RGB_INDUSTRY_18',
    },
    RGB_INDUSTRY_2: {
      SIEBEL: 'Государственная служба',
      SCORING: 'RGB_INDUSTRY_2',
    },
    RGB_INDUSTRY_3: {
      SIEBEL: 'Юридические услуги/нотариальные услуги',
      SCORING: 'RGB_INDUSTRY_21',
    },
    RGB_INDUSTRY_4: {
      SIEBEL: 'Энергетика',
      SCORING: 'RGB_INDUSTRY_3',
    },
    RGB_INDUSTRY_5: {
      SIEBEL: 'ЧОП/Детективная д-ть',
      SCORING: 'RGB_INDUSTRY_20',
    },
    RGB_INDUSTRY_6: {
      SIEBEL: 'Химия/Парфюмерия/Фармацевтика',
      SCORING: 'RGB_INDUSTRY_19',
    },
    RGB_INDUSTRY_7: {
      SIEBEL: 'Управляющая компания',
      SCORING: 'RGB_INDUSTRY_18',
    },
    RGB_INDUSTRY_8: {
      SIEBEL: 'Туризм',
      SCORING: 'RGB_INDUSTRY_6',
    },
    RGB_INDUSTRY_9: {
      SIEBEL: 'Транспорт',
      SCORING: 'RGB_INDUSTRY_17',
    },
    RGB_INDUSTRY_10: {
      SIEBEL: 'Торговля',
      SCORING: 'RGB_INDUSTRY_16',
    },
    RGB_INDUSTRY_11: {
      SIEBEL: 'Строительство',
      SCORING: 'RGB_INDUSTRY_15',
    },
    RGB_INDUSTRY_12: {
      SIEBEL: 'Страхование',
      SCORING: 'RGB_INDUSTRY_18',
    },
    RGB_INDUSTRY_13: {
      SIEBEL: 'Сельское хозяйство',
      SCORING: 'RGB_INDUSTRY_14',
    },
    RGB_INDUSTRY_14: {
      SIEBEL: 'Сборочные производства',
      SCORING: 'RGB_INDUSTRY_13',
    },
    RGB_INDUSTRY_15: {
      SIEBEL: 'Салоны красоты и здоровья',
      SCORING: 'RGB_INDUSTRY_12',
    },
    RGB_INDUSTRY_16: {
      SIEBEL: 'СМИ/Реклама/PR-агенства',
      SCORING: 'RGB_INDUSTRY_11',
    },
    RGB_INDUSTRY_17: {
      SIEBEL: 'Ресторанный бизнес/Общественное питание',
      SCORING: 'RGB_INDUSTRY_9',
    },
    RGB_INDUSTRY_18: {
      SIEBEL: 'Развлечения/Искусство',
      SCORING: 'RGB_INDUSTRY_6',
    },
    RGB_INDUSTRY_19: {
      SIEBEL: 'Подбор персонала',
      SCORING: 'RGB_INDUSTRY_11',
    },
    RGB_INDUSTRY_20: {
      SIEBEL: 'Образование',
      SCORING: 'RGB_INDUSTRY_8',
    },
    RGB_INDUSTRY_21: {
      SIEBEL: 'Нефтегазовая промышленность',
      SCORING: 'RGB_INDUSTRY_3',
    },
    RGB_INDUSTRY_22: {
      SIEBEL: 'Недвижимость',
      SCORING: 'RGB_INDUSTRY_16',
    },
    RGB_INDUSTRY_23: {
      SIEBEL: 'Наука',
      SCORING: 'RGB_INDUSTRY_8',
    },
    RGB_INDUSTRY_24: {
      SIEBEL: 'Металлургия/Промышленность/Машиностроение',
      SCORING: 'RGB_INDUSTRY_10',
    },
    RGB_INDUSTRY_25: {
      SIEBEL: 'Маркетинг',
      SCORING: 'RGB_INDUSTRY_11',
    },
    RGB_INDUSTRY_26: {
      SIEBEL: 'Логистика',
      SCORING: 'RGB_INDUSTRY_17',
    },
    RGB_INDUSTRY_27: {
      SIEBEL: 'Коммунальное хоз-во/Дорожные службы',
      SCORING: 'RGB_INDUSTRY_7',
    },
    RGB_INDUSTRY_28: {
      SIEBEL: 'Информационные услуги',
      SCORING: 'RGB_INDUSTRY_5',
    },
    RGB_INDUSTRY_29: {
      SIEBEL: 'Информационные технологии',
      SCORING: 'RGB_INDUSTRY_5',
    },
    RGB_INDUSTRY_30: {
      SIEBEL: 'Здравоохранение',
      SCORING: 'RGB_INDUSTRY_4',
    },
    RGB_INDUSTRY_31: {
      SIEBEL: 'Другие сферы',
      SCORING: 'OTHER',
    },
  },
} as const;

export const getIndustryCodesFromScoring = () => {
  const result: any[] = [];
  return reduce(Industry.CODES, (acc, item: any) => {
    acc.push(item.SCORING);
    return acc;
  }, result).sort();
};

export const getIndustryCodesFromSiebel = () => {
  const result: any[] = [];
  return reduce(Industry.CODES, (acc, item: any) => {
    acc.push(item.SIEBEL);
    return acc;
  }, result).sort();
};
