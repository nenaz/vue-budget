import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { Errors, RootState } from '@/store/types';
import {
  Sign,
} from './types';

const defaultSignState = () => ({});

export const sign: Module<Sign, RootState> = {
  state: defaultSignState(),
  actions: {
    /**
     * композиция
     * запрос на отправку подписания
     * сохранение данных в state
     */
    async signComposition({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('fetchSignSend');
      }
      // if (!get(rootState, 'error.statusType')) {
      //   await dispatch('getSign', 'created');
      // }
    },
    /**
     * отправка подписания
     */
    async fetchSignSend({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      const trancheSign = get(rootState, 'tranche.sign');
      const { uuid } = trancheSign;

      const response = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: `/signs/sign/${uuid}/send`,
        },
      });
      if (response) {
        dispatch('setSignSendRequest', response);
      }
    },
    /**
     * Композиция
     * отправка кода из смс
     * получение тукущего подписания
     */
    async checkSignComposition({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }, code: string) {
      if (rootState.error.statusType !== Errors.ERROR) {
        await dispatch('checkSign', code);
      }
      if (
        rootState.error.statusType !== Errors.ERROR
         && !rootState.cancelRequest
         && rootState.requests.previousRequestSuccessful
      ) {
        await dispatch('getSign', 'completed');
      }
    },
    /**
     * Получить текущее подписание
     */
    async getSign({ dispatch, rootState, commit }: {
      dispatch: Dispatch;
      rootState: RootState;
      commit: Commit;
    }, fieldName: string) {
      const uuid = get(rootState, 'tranche.sign.uuid');

      if (uuid) {
        const response = await dispatch('serverCommonAPI', {
          type: 'GET',
          params: {
            url: `/signs/sign/${uuid}`,
          },
        });

        if (isEmpty(rootState.error) && response) {
          const activated = !!get(response, fieldName);
          if (!activated) {
            await dispatch('getSign', fieldName);
          } else {
            dispatch('setSignSendRequest', response);
            dispatch('setPreviousRequestSuccessful', true);
          }
        }
      }
    },
    /**
     * сохранение данных отправки подписания
     */
    setSignSendRequest({ commit }: { commit: Commit }, signSend) {
      commit('updateSignSend', signSend);
    },
    /**
     * получить подписание
     * не используется
     * добавить проверку и убрать return
     */
    async fetchSign({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      const trancheSign = get(rootState, 'tranche.sign');
      const { uuid } = trancheSign;
      const signResponse = await dispatch('serverCommonAPI', {
        type: 'GET',
        params: {
          url: `/signs/sign/${uuid}`,
        },
      });
      return signResponse;
    },
    /**
     * Проверка кода подписания
     */
    async checkSign({ dispatch, state, rootState }: {
      dispatch: Dispatch;
      state: Sign;
      rootState: RootState;
    }, code: string): Promise<void> {
      const uuid = get(rootState, 'tranche.sign.uuid');
      const id = get(state, 'send.extId', get(state, 'send.id'));

      await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: `/signs/sign/${uuid}/check`,
          data: {
            extId: id,
            code,
          },
        },
      });
    },
  },
  mutations: {
    updateSignSend(state, value) {
      state.send = value;
    },
  },
};
