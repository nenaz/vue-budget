export interface Sign {
  send?: {
    created: string;
    id: string;
  };
  get?: {
    created: string;
    expire: string;
    key: string;
    uuid: string;
  };
}
