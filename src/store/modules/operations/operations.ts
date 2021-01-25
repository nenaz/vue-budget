import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import { RootState } from '@/store/types';
import { LIST_CATEGORY_DEMO } from '@/dictionaries';
import { Operation } from './types';

const defaultAccountsState = (): Operation[] => ([{}]);

export const operations: Module<Operation[], RootState> = {
  state: {
    ...defaultAccountsState(),
  },
  actions: {
    /**
     * получение операций по счету
     */
    async getOperationsByAccount({ commit, dispatch, rootState }: {
      commit: Commit;
      dispatch: Dispatch;
      rootState: RootState;
    }, accountId: string) {
      console.log('getOperations start');
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
      dispatch('setOperations', response);
    },
    setOperations({ commit }: { commit: Commit }, value) {
      const newValue = value.map((item: any) => {
        const category = LIST_CATEGORY_DEMO.find((list) => (list.uuid === item.category));
        return {
          ...item,
          category,
        };
      });
      console.log('newValue', newValue);
      commit('updateOperations', newValue);
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
