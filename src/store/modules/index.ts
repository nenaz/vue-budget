import { auth } from './auth';
import { clientInstance } from './client-instance';
import { tranche } from './tranche';
import { sign } from './sign';
import { dictionaries } from './dictionaries';
import { accounts } from './accounts';
import { operations } from './operations';

export { Auth } from './auth/types';

export const modules = {
  auth,
  accounts,
  clientInstance,
  dictionaries,
  operations,
  sign,
  tranche,
};
