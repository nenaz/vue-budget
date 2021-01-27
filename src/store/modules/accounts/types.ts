type Account = {
  _id?: string;
  name?: string;
  status?: string;
  amount?: number;
  currency?: string;
  createDate?: string;
  lastUpdate?: string;
};

export type Accounts = {
  allAccounts: Account[];
};
