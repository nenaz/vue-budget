type Operation = {
  _id?: string;
  accountId?: string;
  type?: string;
  amount?: number;
  category?: string;
  subcategory?: number;
  createDate?: number;
  location?: string;
  name?: string;
  createTime?: number;
};

export type Operations = {
  allOperations: {
    [key: string]: Operation[];
  }
};
