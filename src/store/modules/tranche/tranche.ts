import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import axios from 'axios';
import download from 'downloadjs';
import { RootState, Errors } from '@/store/types';
import mutationTypes from '@/store/mutation-types';
import { mockCurrentTranche } from './mock';
import { Document, Tranche, TrancheStatuses } from './types';

const {
  SET_TRANSH_CREATING_STATUS,
  SET_TRANCHE,
} = mutationTypes;

const defaultTrancheState = (): Tranche => ({
  uuid: 'uuid',
  errors: [],
  created: '',
  expire: '',
  activated: '',
  prepared: '',
  built: '',
  confirmed: '',
  completed: '',
  beginDate: '',
  closed: '',
  scored: '',
  tuned: '',
  profile: {
    first: '',
    middle: '',
    last: '',
    gender: '',
    email: '',
    phone: '',
  },
  offer: {
    amount: 0,
    expire: '',
  },
  line: {
    limit: 0,
    debt: 0,
  },
  product: {
    amount: {
      min: 0,
      max: 0,
    },
    termMonths: {
      min: 0,
      max: 0,
      maxDeferred: 0,
    },
    percentYear: 0.0,
  },
  card: {
    number4: '',
    balance: 0,
    expire: '',
  },
  loans: [],
  employment: {},
  agreementOffer: {},
  creditOffers: [],
  documents: [],
  sign: {},
  newCard: {},
  creditOffer: {},
  creditRequest: {},
});

let requestCounts = 0;

export const tranche: Module<Tranche, RootState> = {
  state: defaultTrancheState(),
  actions: {
    /**
     * композиция
     * отправка адреса почты на сервер
     * подтверждение транша
     * подписание
     */
    async creditSignComposition({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('fetchSendDocuments');
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('trancheStatusComposition');
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('signComposition');
      }
    },
    /**
     * отправить запрос создания транша
     * ждать статус транша activated
     * export данных из транша
     */
    async createAndReceiveTranshCreationStatus({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('fetchCreateTransh');
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('getTranche', TrancheStatuses.ACTIVATED);
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        // true - ЗАГЛУШКА ДЛЯ ПРОФИЛЯ РАБОТОДАТЕЛЯ
        await dispatch('fetchExportTrancheData', true);
      }
    },
    /**
     * композиция
     * отправить запрос кредита
     * отправить запрос на подготовку транша
     * ждать статус транша prepared
     * ждать статус транша scored
     * export данных из транша
     */
    async compositionCreateRequest({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('fetchCreateLoanRequest');
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('fetchPrepared');
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('getTranche', TrancheStatuses.PREPARED);
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('getTranche', TrancheStatuses.SCORED);
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('fetchExportTrancheData');
      }
    },
    /**
     * композиция подтверждения транша
     */
    async trancheStatusComposition({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('fetchConfirmed');
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('getTranche', TrancheStatuses.CONFIRMED);
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('fetchExportTrancheData');
      }
    },
    /**
     * композиция запроса текущего транша и запроса данных по нему
     */
    async fetchCurrentTracnheComposition({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('fetchCurrentTranche');
      }
      // ЗАКРЫТО ДЛЯ ЗАГЛУШЕК!!!
      // if (isEmpty(rootState.error)) {
      //   await dispatch('getTranche', 'completed');
      // }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('fetchExportTrancheData');
      }
    },
    /**
     * Композиция запросов на отправку настроек транша и получению статуса трнаша
     */
    async compositionTuneTranche({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }, offerUuid: string) {
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('fetchTrancheTune', offerUuid);
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('getTranche', TrancheStatuses.TUNED);
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('getTranche', TrancheStatuses.BUILT);
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('fetchExportTrancheData');
      }
    },
    /**
     * композиция
     * отправки профиля занятости
     * отправки compositionCreateRequest
     */
    async compositionOfferTranche({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('fetchCreateEmployment');
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('compositionCreateRequest');
      }
    },
    /**
     * запрос создания транша
     */
    async fetchCreateTransh({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      const externalId = get(rootState, 'auth.userProfileList[0].externalId', '2-53K1TBY-4');
      const response: Tranche = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/transhs/transh',
          data: {
            externalId,
          },
        },
      });
      if (response) {
        // ЗАГЛУШКА РАБОТОДАТЕЛЯ
        const employment = {
          income: 123123.0,
          experience: 11,
          organization: 'ОАО \"ТВЕРЬТЕХОСНАСТКА\"',
          ownership: '0271c6b6-5185-484b-9bf7-847ea7018fe1',
          sector: '79d73031-64f3-459b-8399-11d188c256cf',
          specialization: 'a6873a7d-cbfc-48ef-8aea-b78bd08c8c71',
          position: '0ff853ff-9933-4c63-8ab7-fd028bfed1bc',
          address: 'г Тверь, ул Учительская, д 54',
          phone: '+7(111)-111-11-11',
        };
        const responseWithEmployment = {
          ...response,
          employment,
        };
        if (!get(responseWithEmployment, 'statusType')) {
          dispatch('setTranche', responseWithEmployment);
        }
      }
    },
    /**
     * Обновить объект транша
     */
    setTranche({ commit }: { commit: Commit }, value) {
      commit(SET_TRANCHE, value);
    },
    /**
     * получить статус транша
     * @param fieldName - название поля транша, появление которого ожидаем
     */
    async getTranche({ rootState, dispatch, commit }: {
      rootState: RootState;
      dispatch: Dispatch;
      commit: Commit;
    }, fieldName: string) {
      requestCounts += 1;
      const uuid = get(rootState, 'tranche.uuid');
      if (uuid) {
        const response = await dispatch('serverCommonAPI', {
          type: 'GET',
          params: {
            url: `/transhs/transh/${uuid}`,
          },
          options: {
            requestCounts,
          },
        });
        console.log('response', response);
        console.log('fieldName', fieldName);
        if (isEmpty(rootState.error) && response) {
          const activated = !!get(response, fieldName);
          if (!activated) {
            await dispatch('getTranche', fieldName);
          } else {
            const { employment } = response;
            if (!isEmpty(employment)) {
              dispatch('setEmployment', employment);
            }
            requestCounts = 0;
            dispatch('setTranche', response);
            dispatch('setPreviousRequestSuccessful', true);
          }
        } else {
          requestCounts = 0;
        }
      }
    },
    /**
     * Обновить профиль занятости
     */
    setEmployment({ commit }: { commit: Commit }, employment) {
      commit('updatePlaceOfWorkAndIncome', employment);
    },
    /**
     * создание профиля занятости
     */
    async fetchCreateEmployment({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      const uuid = get(rootState, 'tranche.uuid');
      const { placeOfWorkAndIncome } = rootState;

      await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: `/transhs/transh/${uuid}/employment`,
          data: {
            income: placeOfWorkAndIncome.income,
            experience: placeOfWorkAndIncome.experience,
            organization: placeOfWorkAndIncome.organization,
            ownership: placeOfWorkAndIncome.ownership.uuid,
            sector: placeOfWorkAndIncome.sector.uuid,
            specialization: placeOfWorkAndIncome.specialization.uuid,
            position: placeOfWorkAndIncome.position.uuid,
            address: placeOfWorkAndIncome.address,
            phone: placeOfWorkAndIncome.phone,
          },
        },
      });
    },
    /**
     * создать запрос кредита
     */
    async fetchCreateLoanRequest({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      const uuid = get(rootState, 'tranche.uuid');
      const amount = get(rootState, 'creditParams.creditAmount');
      const monthlyPayment = get(rootState, 'creditParams.monthlyPayment');
      const term = get(rootState, 'creditParams.term');

      await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: `/transhs/transh/${uuid}/credit-request`,
          data: {
            amount,
            payment: monthlyPayment,
            termMonths: term,
            paymentDay: 10,
          },
        },
      });
    },
    /**
     * Подготовить транш
     */
    async fetchPrepared({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      const uuid = get(rootState, 'tranche.uuid');

      await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: `/transhs/transh/${uuid}/ready`,
        },
      });
    },
    /**
     * подтверждение транша
     */
    async fetchConfirmed({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      const uuid = get(rootState, 'tranche.uuid');

      await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: `/transhs/transh/${uuid}/confirm`,
        },
      });
    },
    /**
     * Запрос атрибудов документа
     */
    async fetchDocument({ rootState, dispatch }: {
      rootState: RootState;
      dispatch: Dispatch;
    }, documentUuid: string) {
      const uuid = get(rootState, 'tranche.uuid');
      const response = await dispatch('serverCommonAPI', {
        type: 'GET',
        params: {
          url: `/transhs/transh/${uuid}/document/${documentUuid}`,
        },
      });
      if (!get(response, 'statusType')) {
        return response;
      }
      return {};
    },
    /**
     * Скачаивание документа
     * Переделать
     * Когда будет единый url для авторизации и остального приложения
     */
    // В РАЗРАБОТКЕ
    async downloadDocument({ rootState, dispatch }: {
      rootState: RootState;
      dispatch: Dispatch;
    }, documentAttr) {
      const { location, title } = documentAttr;
      axios
        .get(`${process.env.VUE_APP_SERVER_URL_LOCAL}${location}`, {
          responseType: 'blob',
        })
        .then((response) => {
          const content = response.headers['content-type'];
          download(response.data, title, content);
        })
        .catch((error) => console.log(error));
    },
    /**
     * Найти текущий транш
     * В разработке
     */
    async fetchCurrentTranche({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      const storageExtId = localStorage.getItem('externalId');
      const externalId = get(rootState, 'auth.userProfileList[0].externalId', storageExtId);
      const response = await dispatch('serverCommonAPI', {
        type: 'GET',
        params: {
          url: `/transhs/transh/current?externalId=${externalId}`,
        },
      });
      console.log('response', response);
      if (response && !response.status) {
        dispatch('setCurrentTrancheFlag', true);
        dispatch('setTranche', response);
      } else {
        dispatch('setCurrentTrancheFlag', false);
      }
      // dispatch('setPreviousRequestSuccessful', false);
    },
    /**
     * отправка документов по траншу на email
     */
    async fetchSendDocuments({ dispatch, state }: {
      dispatch: Dispatch;
      state: Tranche;
    }): Promise<void> {
      // dispatch('setError', {});
      const uuid = get(state, 'uuid');
      const email = get(state, 'profile.email');
      if (uuid && email) {
        await dispatch('serverCommonAPI', {
          type: 'POST',
          params: {
            url: `/transhs/transh/${uuid}/email-me`,
            data: {
              email,
            },
          },
        });
      }
    },
    /**
     * Получить данные по траншу(getTranche получает только статусы)
     */
    async fetchExportTrancheData({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }, first?: boolean) {
      const uuid = get(rootState, 'tranche.uuid');
      if (uuid) {
        const response = await dispatch('serverCommonAPI', {
          type: 'GET',
          params: {
            url: `/transhs/transh/${uuid}/export`,
          },
        });
        if (rootState.error.statusType !== 'error' && response) {
          /**
           * из скоринга фозвращать такой формат и пока только 1 элемент
           */
          const newresponse = {
            ...response,
          };
          if (newresponse.creditOffers) {
            newresponse.creditOffers = [
              {
                uuid: 'cc11bfc4-4786-4402-883c-eaabb95bfd34',
                amount: response.creditRequest.amount,
                term: response.creditRequest.termMonths,
                percentYear: response.product.percentYear,
                main: true,
              },
            ];
          }
          if (newresponse.creditOffer) {
            newresponse.creditOffer = {
              uuid: 'cc11bfc4-4786-4402-883c-eaabb95bfd34',
              amount: response.creditRequest.amount,
              term: response.creditRequest.termMonths,
              percentYear: response.product.percentYear,
            };
          }
          // ЗАГЛУШКА ДЛЯ ПРОФИЛЯ РАБОТОДАТЕЛЯ
          if (first) {
            newresponse.employment = {
              income: 123123.0,
              experience: 11,
              organization: 'ОАО \"ТВЕРЬТЕХОСНАСТКА\"',
              ownership: '0271c6b6-5185-484b-9bf7-847ea7018fe1',
              sector: '79d73031-64f3-459b-8399-11d188c256cf',
              specialization: 'a6873a7d-cbfc-48ef-8aea-b78bd08c8c71',
              position: '0ff853ff-9933-4c63-8ab7-fd028bfed1bc',
              address: 'г Тверь, ул Учительская, д 54',
              phone: '+7(111)-111-11-11',
            };
            dispatch('setEmployment', {
              address: newresponse.employment.address,
              experience: newresponse.employment.experience,
              income: newresponse.employment.income,
              organization: newresponse.employment.organization,
              ownership: {
                title: 'Некоммерческая организация',
                uuid: newresponse.employment.ownership,
                order: 5,
              },
              phone: newresponse.employment.phone,
              position: {
                title: 'Индивидуальный предприниматель',
                uuid: newresponse.employment.position,
                order: 5,
              },
              sector: {
                title: 'Здравоохранение',
                uuid: newresponse.employment.sector,
                order: 5,
              },
              specialization: {
                title: 'Секретариат Кадры',
                uuid: newresponse.employment.specialization,
                order: 5,
              },
            });
          }
          dispatch('setTranche', newresponse);
        }
      }
    },
    /**
     * отправить настройки транша
     */
    async fetchTrancheTune({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }, offerUuid: string) {
      const uuid = get(rootState, 'tranche.uuid');
      if (uuid && offerUuid) {
        await dispatch('serverCommonAPI', {
          type: 'POST',
          params: {
            url: `/transhs/transh/${uuid}/tune`,
            data: {
              offer: offerUuid,
              notes: '',
            },
          },
        });
      }
    },
    resetStateTranche({ commit }: {
      commit: Commit;
    }) {
      commit('resetTrancheState');
    },
  },
  mutations: {
    [SET_TRANSH_CREATING_STATUS](state: any, value: boolean) {
      state.status = value;
    },
    [SET_TRANCHE](state: any, value: Tranche) {
      Object.assign(state, value);
    },
    resetTrancheState(state: Tranche): void {
      Object.assign(state, defaultTrancheState());
    },
  },
  getters: {
    getCreditDocument: (data) => {
      const documents = get(data, 'documents', []);
      if (documents.length) {
        const cDocuments = documents.filter((item: Document) => (
          item.title !== 'Заявление на выпуск виртуальной карты'
        ));
        return cDocuments;
      }
      return [];
    },
  },
};
