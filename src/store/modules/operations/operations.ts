import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import { RootState } from '@/store/types';
// import { LIST_CATEGORY_DEMO } from '@/dictionaries';
import { Operations } from './types';

const defaultAccountsState = (): any => ({
  operations: {},
});

export const operations: Module<any, RootState> = {
  state: defaultAccountsState(),
  actions: {
    /**
     * получение операций по счету
     */
    async getOperationsByAccount({ commit, dispatch }: {
      commit: Commit;
      dispatch: Dispatch;
      // rootState: RootState;
    }, accountId: string) {
      console.log('getOperations start');
      commit('resetState');
      const response = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/operations',
          data: {
            accountId,
          },
        },
      });
      console.log('getOperations finish', response);
      // return response;
      // dispatch('setOperations', response);
      commit('updateOperations', response);
    },
  },
  mutations: {
    updateOperations(state, value: any) {
      Object.assign(state.operations, value);
      console.log('operations save to store');
    },
    resetState(state) {
      Object.assign(state, defaultAccountsState());
    },
  },
  getters: {
    getOperations: (state) => {
      console.log();
      return state;
    },
    // getOperationCategory: (state, uuid) => {
    //   console.log();
    //   const operations = state;
    //   const category = LIST_CATEGORY_DEMO.find((item) => (item.uuid === uuid));
    //   const operation = operations.find((oper) => (oper.uuid === uuid));
    //   return {
    //     ...operation,
    //     categoryObj: category,
    //   };
    // },
  },
};
