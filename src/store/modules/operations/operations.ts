import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import { RootState } from '@/store/types';
import { Operations } from './types';

const defaultAccountsState = (): Operations => ([{
  amount: 1,
}]);

export const operations: Module<Operations, RootState> = {
  state: defaultAccountsState(),
  actions: {
    /**
     * получение операций по счету
     */
    async getOperationsByAccount({ commit, dispatch, rootState }: {
      commit: Commit;
      dispatch: Dispatch;
      rootState: RootState;
    }, accountId: string) {
      console.log('getOperations');
      const response = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/operations',
          data: {
            accountId,
          },
        },
      });
      return response;
      // dispatch('setOperations', response);
    },
    setOperations({ commit }: { commit: Commit }, value) {
      commit('updateOperations', value);
    },
  },
  mutations: {
    updateOperations(state, value: any) {
      Object.assign(state, value);
      console.log('operations save to store');
    },
  },
  getters: {
    getOperations: (state) => {
      console.log();
      return state;
    },
  },
};
