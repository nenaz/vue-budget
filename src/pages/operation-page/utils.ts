// t=20210508T133300&s=11600.10&fn=9960440300334468&i=8993&fp=2074821875&n=1
// https://play.google.com/store/apps/details?id=ru.FoodSoul.MskMarcianoclub
// https://apps.apple.com/us/app/marciano-club-москва/id1549877387?uo=4
// [2020]
// JVrGHYaXq4NcYPA1eOO71pN9nk9oJvPKfuuAQsJK2rMvhYJYiZWE2tzXl6E2WYSA9NQCbPLp9c/Dirqren8zDQ==
// 4640018900570
import { Account, AccountToView } from './types';

type GetDateTime = {
  date: string;
  time: string;
};

type QrCodeResultParse = {
  dateTime: GetDateTime;
  amount: number;
};

const findAndCopyStringByValue = (scanResult: string, value: string): string => {
  const END_POS = '&';
  const timeStartPos = scanResult.indexOf(value);
  if (timeStartPos !== -1) {
    const timeEndPos = scanResult.indexOf(END_POS, timeStartPos) === -1
      ? scanResult.length
      : scanResult.indexOf(END_POS, timeStartPos);
    const resStr = (scanResult.substring(timeStartPos + 2, timeEndPos));
    return resStr;
  }
  return '';
};

const getDateTime = (scanResult: string): GetDateTime => {
  type Res = {
    [key: string]: string;
  };
  type Res2 = {
    [key: string]: number;
  };
  const tempDateTime = findAndCopyStringByValue(scanResult, 't=');
  if (tempDateTime) {
    const temp = tempDateTime.match(/\d+/g);
    const tempStr = temp ? temp.join('') : '';
    const formatData: Res2[] = [
      { year: 4 },
      { month: 2 },
      { day: 2 },
      { hour: 2 },
      { min: 2 },
      { sec: 2 },
    ];

    let pos = 0;
    const resultObj: Res = {};

    for (let i = 0; i < formatData.length; i += 1) {
      const item: Res2 = formatData[i];
      const key: string = Object.keys(item)[0];
      resultObj[key] = tempStr.substr(pos, item[key]);
      pos += item[key];
    }

    return {
      date: `${resultObj.day}.${resultObj.month}.${resultObj.year}`,
      time: `${resultObj.hour}:${resultObj.min}:${resultObj.sec}`,
    };
  }
  return {
    date: '',
    time: '',
  };
};

const getAmount = (scanResult: string): number => {
  const result = findAndCopyStringByValue(scanResult, 's=');
  if (result) {
    return Number(result);
  }
  return 0;
};

export const qrCodeResultParse = (scanResult: string): QrCodeResultParse => {
  console.log();
  return {
    dateTime: getDateTime(scanResult),
    amount: getAmount(scanResult),
  };
};

export const getAccountsList = (
  accountsList: Account[],
  currentAccount: Account,
): AccountToView[] => {
  const accListWithoutCurrAcc = accountsList.filter((item: Account) => (
    // eslint-disable-next-line no-underscore-dangle
    item._id !== currentAccount._id
  ));
  return accListWithoutCurrAcc.map((item, key) => ({
    ...item,
    uuid: key,
    title: `${item.name} ${item.amount} руб.`,
  }));
};
