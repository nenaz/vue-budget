type Operation = {
  _id?: string;
  account_id?: string;
  type?: string;
  amount?: number;
  category?: number;
  subcategory?: number;
  createDate?: string;
  location?: string;
  name?: string;
  createTime?: string;
};

export type Operations = Operation[];
