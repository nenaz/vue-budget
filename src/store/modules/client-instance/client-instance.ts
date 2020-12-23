import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { RootState, ClientInstanceResponse, Errors } from '@/store/types';

const defaultClientState = () => ({
  uuid: '',
  card: undefined,
  line: {
    limit: 0,
    debt: 0,
  },
  loans: [],
  activated: undefined,
  errors: [],
});

let requestCounts = 0;

export const clientInstance: Module<ClientInstanceResponse, RootState> = {
  state: defaultClientState(),
  actions: {
    /**
     * Композиция функций получения Экземпляра клиента
     * и запроса текущего транша
     */
    async fetchClientAndCurrTrancheCompisition({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('clientInstansComposition');
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('fetchCurrentTracnheComposition');
      }
    },
    /**
     * Композиция функуций создания и ожидания активации Экземпляра клиента
     */
    async clientInstansComposition({ dispatch, rootState, state }: {
      dispatch: Dispatch;
      rootState: RootState;
      state: ClientInstanceResponse;
    }) {
      // dispatch('setError', {});
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('createClientInstance');
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('getClientInstance', 'activated');
      }
    },
    /**
     * Запрос создания экземпляра клиента
     */
    async createClientInstance({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      // dispatch('setError', {});
      const storageExtId = localStorage.getItem('externalId');
      // const externalId = get(rootState, 'auth.userProfileList[0].externalId', '2-53K1TBY-4');
      const extlId = get(rootState, 'auth.userProfileList[0].externalId', storageExtId);
      const response: ClientInstanceResponse = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/clients/client',
          data: {
            externalId: extlId,
          },
        },
      });
      if (!get(response, 'statusType')) {
        // if (get(response, 'errors')) {
        //   dispatch('setError', {
        //     statusType: 'error',
        //   });
        // }
        dispatch('setClientInstance', response);
      }
    },
    /**
     * обновление экземпляра клиента в state
     */
    setClientInstance({ commit }: { commit: Commit }, value) {
      commit('updateClientInstance', value);
    },
    /**
     * получение статуса экземпляра клиента
     * @param fieldName - название поля экземпляра, появление которого ожидаем
     */
    async getClientInstance({ commit, dispatch, rootState }: {
      commit: Commit;
      dispatch: Dispatch;
      rootState: RootState;
    }, fieldName: string) {
      // dispatch('setError', {});
      requestCounts += 1;
      const clientInstanceUuid = get(rootState, 'clientInstance.uuid');
      if (clientInstanceUuid) {
        const response = await dispatch('serverCommonAPI', {
          type: 'GET',
          params: {
            url: `/clients/client/${clientInstanceUuid}`,
          },
          options: {
            requestCounts,
          },
        });
        if (isEmpty(rootState.error) && response && !response.status) {
          const activated = !!get(response, fieldName);
          if (!activated) {
            await dispatch('getClientInstance', 'activated');
          } else {
            requestCounts = 0;
            dispatch('setClientInstance', response);
            dispatch('setPreviousRequestSuccessful', true);
          }
        } else {
          requestCounts = 0;
        }
      }
    },
    /**
     * ЗАГЛУШКА
     * Копирование данных из транша в текущий клиентский профиль
     * Обновляются данные по карте
     * Добавляется новый кредит в соотв с параметрами транша
     */
    mockCopyDataToClientLoans({ rootState, commit }: {
      rootState: RootState;
      commit: Commit;
    }) {
      const { tranche, creditParams } = rootState;
      const nextPayment = creditParams.activeTab === 'amount'
        ? creditParams.calcMonthlyPayment
        : creditParams.manualMonthlyPayment;
      const loan = {
        beginDate: tranche.beginDate,
        nextDate: tranche.agreementOffer.payments[0].date,
        nextPayment,
        amount: tranche.creditOffer.amount,
        debt: tranche.creditOffer.amount,
      };
      const card = {
        balance: tranche.creditOffer.amount,
        expire: tranche.newCard.expire,
        number4: tranche.newCard.number4,
      };
      commit('updateClientLoans', loan);
      commit('updateClientCard', card);
    },
    /**
     * ЗАГЛУШКА
     * для логина testuser1 добавляются кредиты и карта по умолчанию
     */
    mockAddInfoByUserLogin({ rootState, commit }: {
      rootState: RootState;
      commit: Commit;
    }) {
      const userLogin = rootState.auth.login;
      console.log('userLogin', userLogin);
      if (userLogin === 'testuser1') {
        const card = {
          balance: 50000,
          expire: '2023-06-30',
          number4: '3004',
        };
        const loan1 = {
          beginDate: '2020-10-01',
          nextDate: '2020-11-11',
          nextPayment: 3223.28,
          amount: 8000,
          debt: 8000,
          uuid: '1',
        };
        const loan2 = {
          beginDate: '2020-10-01',
          nextDate: '2020-11-11',
          nextPayment: 5386.76,
          amount: 42000,
          debt: 42000,
          uuid: '2',
        };
        commit('updateClientLoans', loan1);
        commit('updateClientLoans', loan2);
        commit('updateClientCard', card);
      }
    },
  },
  mutations: {
    updateClientInstance(state, value: ClientInstanceResponse) {
      Object.assign(state, value);
    },
    resetClientState(state: ClientInstanceResponse): void {
      Object.assign(state, defaultClientState());
    },
    updateClientLoans(state, value) {
      if (state.loans) {
        state.loans.push(value);
      } else {
        state.loans = [value];
      }
    },
    updateClientCard(state, value) {
      const balance = get(state, 'card.balance', 0) + value.balance;
      state.card = {
        balance,
        expire: value.expire,
        number4: value.number4,
      };
    },
  },
  getters: {
    getHasLine: (data) => (
      !!get(data, 'line', false)
    ),
    getHasOffer: (data) => (
      !!get(data, 'offer', false)
    ),
    getHasCard: (data) => (
      !!get(data, 'card', false)
    ),
    getHasLoans: (data) => (
      !!get(data, 'loans.length', false)
    ),
  },
};
