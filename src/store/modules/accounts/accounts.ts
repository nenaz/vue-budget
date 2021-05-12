import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import { RootState } from '@/store/types';
import { OPERATION_TYPES } from '@/dictionaries';
import {
  Account,
  Accounts,
  DataForUpdateAccount,
} from './types';

const defaultAccountsState = (): Accounts => ({
  allAccounts: [],
});

interface OperationParams {
  account: Account;
  accountFrom?: Account;
  amount: number;
  category: string;
  createDate: string;
  operationType: {
    title: string;
    uuid: string;
  };
}

export const accounts: Module<Accounts, RootState> = {
  state: defaultAccountsState(),
  actions: {
    /**
     */
    async createAccount({ commit, dispatch }: {
      commit: Commit;
      dispatch: Dispatch;
    }, params) {
      console.log('params', params);
      await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/accounts/create',
          data: {
            ...params,
          },
        },
      });
      // dispatch('setAccounts', response);
    },
    /**
     * получение счетов клиента
     */
    async getAccounts({ commit, dispatch, rootState }: {
      commit: Commit;
      dispatch: Dispatch;
      rootState: RootState;
    }, userId: string) {
      console.log('getAccounts');
      const response = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/accounts',
          data: {
            userId,
          },
        },
      });
      dispatch('setAccounts', response);
    },
    setAccounts({ commit }: { commit: Commit }, value) {
      commit('updateAccounts', value);
    },
    async fetchUpdateAccount({ commit, dispatch }: {
      commit: Commit;
      dispatch: Dispatch;
    }, params) {
      const result = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/accounts/update',
          data: {
            ...params,
          },
        },
      });
      return result;
    },
    async createOperationComposition({ commit, dispatch }: {
      commit: Commit;
      dispatch: Dispatch;
    }, operationParams: OperationParams) {
      const result = await dispatch('createOperation', operationParams);
      if (result.message === 'success') {
        const params: DataForUpdateAccount = {
          amount: operationParams.amount,
          /* eslint-disable-next-line */
          id: operationParams.account._id,
          operationType: operationParams.operationType,
          idFrom: null,
        };
        if (operationParams.operationType.uuid === OPERATION_TYPES[2].uuid) {
          params.idFrom = operationParams.accountFrom?._id || null;
        }
        await dispatch('fetchUpdateAccount', params);
      }
    },
    async deleteThisAccount({ commit, dispatch }: {
      commit: Commit;
      dispatch: Dispatch;
    }, id) {
      const result = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/accounts/delete',
          data: {
            id,
          },
        },
      });
      return result;
    },
    editThisAccount() {
      console.log('editThisAccount');
    },
  },
  mutations: {
    updateAccounts(state, value: any) {
      // Object.assign(state, value);
      state.allAccounts = value;
    },
  },
  getters: {
    getAccountById: (state) => (id: string) => {
      console.log('id', id);
      console.log('state', state);
      const { allAccounts } = state;
      // eslint-disable-next-line no-underscore-dangle
      const e = allAccounts.find((item) => item._id === id);
      console.log('find', e);
      // eslint-disable-next-line no-underscore-dangle
      return allAccounts.find((item) => item._id === id);
    },
  },
};
