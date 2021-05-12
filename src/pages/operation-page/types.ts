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
  type: {
    order: number;
    title: string;
    uuid: string;
  };
};

export type AccountToView = Account & {
  uuid: number;
  title: string;
};
