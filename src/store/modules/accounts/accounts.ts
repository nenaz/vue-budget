import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import { RootState } from '@/store/types';
import { Accounts } from './types';

const defaultAccountsState = (): Accounts => ({
  allAccounts: [],
});

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
      // dispatch('setError', {});
      // requestCounts += 1;
      // const clientInstanceUuid = get(rootState, 'clientInstance.uuid');
      // if (clientInstanceUuid) {
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
    async createOperation({ commit, dispatch }: {
      commit: Commit;
      dispatch: Dispatch;
    }, params) {
      const result = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/operations/create',
          data: {
            ...params,
          },
        },
      });
      return result;
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
    }, operationParams) {
      const result = await dispatch('createOperation', operationParams);
      if (result.message === 'success') {
        await dispatch('fetchUpdateAccount', {
          amount: operationParams.amount,
          /* eslint-disable-next-line */
          id: operationParams.account._id,
          operationType: operationParams.operationType,
        });
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
