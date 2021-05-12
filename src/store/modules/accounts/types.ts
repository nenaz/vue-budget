export type Account = {
  __v: number;
  _id: string;
  amount: number;
  createDate: string;
  currency: {
    title: string;
    uuid: string;
  };
  lastUpdate: string;
  name: string;
  status: string;
  title: string;
  type: {
    order: number;
    title: string;
    uuid: string;
  };
};

export type Accounts = {
  allAccounts: Account[];
};

export type DataForUpdateAccount = {
  amount: number;
  id: string;
  idFrom: string | null;
  operationType: {
    title: string;
    uuid: string;
  };
};
