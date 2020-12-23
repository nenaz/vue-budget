type RegExpIndex = {
  [key: string]: RegExp;
}

export const regex: RegExpIndex = {
  onlyNumber: /(\d)(?=(\d{3})+(?!\d))/,
  email: /\S+@\S+\.\S+/,
};
