import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import { RootState } from '@/store/types';
// import { LIST_CATEGORY_DEMO } from '@/dictionaries';
import {
  Operations,
  OperationsFind,
  ResponseCharDatas,
} from './types';

const defaultOperationsState = (): any => ({
  data: {},
  length: 0,
  operationsForPeriod: {
    names: [],
    data: [],
  },
});

export const operations: Module<any, RootState> = {
  state: defaultOperationsState(),
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
    async fetchOperationsForPeriod({ dispatch }: {
      dispatch: Dispatch;
    }, params: OperationsFind) {
      const response = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/operations/find',
          data: {
            params,
          },
        },
      });
      dispatch('setOperationsFindResult', response);
    },
    setOperations({ commit }: { commit: Commit }, value) {
      commit('updateOperations', value);
      commit('updateOperationsLength', value);
    },
    setOperationsFindResult({ commit }: { commit: Commit }, value: ResponseCharDatas) {
      commit('updateOperationsFindResult', value);
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
      Object.assign(state, defaultOperationsState());
    },
    updateOperationsFindResult(state, value) {
      state.operationsForPeriod = value;
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
    getOperationsForPeriod(state) {
      return state.operationsForPeriod.donutChartData;
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
