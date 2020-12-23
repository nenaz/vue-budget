import { regex } from '@/utils/regex';

type Mask = {
  regex: RegExp;
  placeholder: string;
};

type Masks = {
  [key: string]: Mask;
};

const onlyNumberMask = {
  regex: regex.onlyNumber,
  placeholder: '',
};

export const masks: Masks = {
  onlyNumberMask,
};
