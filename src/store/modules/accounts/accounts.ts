import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import { RootState } from '@/store/types';
import { Accounts } from './types';

const defaultAccountsState = (): Accounts => ([]);

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
          url: '/operations/create',
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
      await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/operations/create',
          data: {
            ...params,
          },
        },
      });
    },
  },
  mutations: {
    updateAccounts(state, value: any) {
      Object.assign(state, value);
    },
  },
  getters: {
    getAccountById: (state) => (id: string) => {
      console.log('id', id);
      console.log('state', state);
      // eslint-disable-next-line no-underscore-dangle
      const e = state.find((item) => item._id === id);
      console.log('find', e);
      // eslint-disable-next-line no-underscore-dangle
      return state.find((item) => item._id === id);
    },
  },
};
