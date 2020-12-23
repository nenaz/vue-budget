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
     * получение счетов клиента
     */
    async getAccounts({ commit, dispatch, rootState }: {
      commit: Commit;
      dispatch: Dispatch;
      rootState: RootState;
    }, fieldName: string) {
      console.log('getAccounts');
      // dispatch('setError', {});
      // requestCounts += 1;
      // const clientInstanceUuid = get(rootState, 'clientInstance.uuid');
      // if (clientInstanceUuid) {
      const response = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/accounts',
        },
      });
      dispatch('setAccounts', response);
    },
    setAccounts({ commit }: { commit: Commit }, value) {
      commit('updateAccounts', value);
    },
  },
  mutations: {
    updateAccounts(state, value: any) {
      Object.assign(state, value);
    },
  },
  getters: {
    getAccountById: (state) => (id: string) => {
      // eslint-disable-next-line no-underscore-dangle
      state.find((item) => item._id === id);
    },
  },
};
