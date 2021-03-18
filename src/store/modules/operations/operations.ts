import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import { RootState } from '@/store/types';
// import { LIST_CATEGORY_DEMO } from '@/dictionaries';
import { Operations } from './types';

const defaultAccountsState = (): any => ({
  data: {},
  length: 0,
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
      dispatch('setOperations', response);
    },
    setOperations({ commit }: { commit: Commit }, value) {
      commit('updateOperations', value);
      commit('updateOperationsLength', value);
    },
  },
  mutations: {
    updateOperationsLength(state, value: any) {
      state.length = Object.keys(value).length;
      console.log('operations length save to store');
    },
    updateOperations(state, value: any) {
      state.data = value;
      console.log('operations data save to store');
    },
    resetState(state) {
      Object.assign(state, defaultAccountsState());
    },
  },
  getters: {
    getOperations(state) {
      return state;
    },
    getOperationsLength(state) {
      console.log('getOperationsLength_state', state);
      return state
        ? Object.keys(state).length
        : 0;
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
