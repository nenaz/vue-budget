import Cookies from 'js-cookie';
import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { axiosPostAuth } from '@/utils/server-interaction/server-interaction';
import { getExpires } from '@/utils/cookies';
import mutationTypes from '@/store/mutation-types';
import { RootState } from '@/store/types';
import {
  AuthenticateResponse,
  Auth,
  ProccedResponse,
} from './types';

const {
  SET_AUTH_CONSENT,
} = mutationTypes;

const EXPIRES = 3600000;

const defaultAuthState = (): Auth => ({
  birthDate: '',
  consent: false,
  login: 'q',
  password: 'q',
  phone: '',
  sessionList: [],
  userProfileList: [],
});

export const auth: Module<Auth, RootState> = {
  state: defaultAuthState(),
  actions: {
    closeSession({ dispatch, commit }: {
      dispatch: Dispatch;
      commit: Commit;
    }) {
      dispatch('serverAuthAPI', {
        url: '/users/logout',
        data: {},
      });
    },
    /**
     * композиция для Аутентификации пользователя и получения sessionToken, authSessionToken
     */
    async authProcedure({ dispatch, commit }: {
      dispatch: Dispatch;
      commit: Commit;
    }) {
      // dispatch('removeAuthInfo');
      dispatch('setRequestInProgress', true);
      await dispatch('authenticate');
      dispatch('setRequestInProgress', false);
    },
    /**
     * Аутентифицировать пользователя
     */
    async authenticate({ state, dispatch, rootState }: {
      state: Auth;
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      dispatch('setError', {});
      const { login, password } = state;

      const response = await dispatch('serverAuthAPI', {
        url: '/users/gettoken',
        data: {
          login,
          password,
        },
      });
      console.log('response.data', response);

      if (isEmpty(rootState.error)) {
        dispatch('setAuthInfo', response.data.token);
      }
    },
    /**
     * удалить текущие авторизационные куки, перед записью новых
     */
    removeAuthInfo() {
      Cookies.remove('token');
      Cookies.remove('authSessionToken');
      Cookies.remove('accessToken');
    },
    /**
     * Сохранить token и authSessionToken
     */
    setAuthInfo(
      { commit }: { commit: Commit },
      token: string,
    ) {
      Cookies.set(
        'token',
        token,
        {
          expires: getExpires(EXPIRES),
          // secure: true,
          samesite: 'lax',
          path: '/',
        },
      );
    },
    /**
     * сохранить номер телефона на который отправляется СМС для проверки
     */
    setUserPhone(
      { commit }: { commit: Commit },
      authenticateObject: AuthenticateResponse | undefined,
    ) {
      const phone = get(authenticateObject, 'confirmation.recipient', '');
      if (phone) {
        commit('updateAuthPhone', phone);
      }
    },
    /**
     * композиция для Аутентификации пользователя и получения accessToken
     */
    async authProcedureContinue({ dispatch, commit, rootState }: {
      dispatch: Dispatch;
      commit: Commit;
      rootState: RootState;
    }) {
      dispatch('setError', {});
      if (isEmpty(rootState.error)) {
        dispatch('setRequestInProgress', true);
        await dispatch('authProccess');
        dispatch('setRequestInProgress', false);
      }
      commit('resetVerificationCode');
    },
    /**
     * проверка OTP кода
     */
    async authProccess({
      rootState,
      dispatch,
      commit,
    }: {
      rootState: RootState;
      dispatch: Dispatch;
      commit: Commit;
    }) {
      dispatch('setError', {});
      const token = Cookies.get('token');
      const authSessionToken = Cookies.get('authSessionToken');
      const { verificationCode } = rootState;

      const response = await dispatch('serverAuthAPI', {
        url: '/v1/authenticate/proceed',
        data: {
          data: {
            authSessionToken,
            channel: 'ib',
          },
          confirmation: {
            token,
            code: verificationCode,
          },
        },
      });

      if (isEmpty(rootState.error)) {
        dispatch('setAuth', response.data);
        localStorage.setItem('externalId', response.data.data.userProfileList[0].externalId);
        dispatch('setAccessToken', response.data);
        console.log('setAccessToken');
        commit('updateAuthStatus', true);
      }
    },
    setAuth(
      { commit }: { commit: Commit},
      processResponseObject: ProccedResponse | undefined,
    ) {
      commit('setAuth', processResponseObject);
    },
    /**
     * Сохранить accessToken
     */
    setAccessToken(
      { commit }: { commit: Commit},
      processResponseObject: ProccedResponse | undefined,
    ) {
      Cookies.set(
        'accessToken',
        get(processResponseObject, 'data.sessionList[0].accessToken'),
        { expires: getExpires(EXPIRES) },
      );
    },
    /**
     * Продлить Сессию
     */
    async sessionPing() {
      const accessToken = Cookies.get('accessToken');

      return axiosPostAuth({
        url: '/v1/security/ping',
        data: {
          data: {},
          accessToken,
        },
      }).then(({ data }) => (
        data
      )).catch((error) => {
        console.log('ERROR', error);
      });
    },
    /**
     * Завершить Сессию
     */
    async logout() {
      const token = Cookies.get('token');
      const accessToken = Cookies.get('accessToken');

      return axiosPostAuth({
        url: '/v1/security/logout',
        data: {
          accessToken,
          data: {
            token,
          },
        },
      }).then(({ data }) => (
        data
      )).catch((error) => {
        console.log('ERROR', error);
      });
    },
    async loginWithoutCode({ dispatch, state }: {
      dispatch: Dispatch;
      state: Auth;
    }) {
      dispatch('setError', {});
      const { login, password } = state;

      const response = await dispatch('serverAuthAPI', {
        url: '/v1/authenticate',
        data: {
          data: {
            login,
            password,
            channel: 'ib',
          },
          accessToken: null,
        },
      });
      dispatch('ScriptProcessorNode', response.data);
    },
    async ScriptProcessorNode({ dispatch, state }: {
      dispatch: Dispatch;
      state: Auth;
    }, data: any) {
      dispatch('setError', {});
      const { login, password } = state;
      console.log('data.data.authSessionToken', data.data.authSessionToken);

      const response = await dispatch('serverAuthAPI', {
        url: '/v1/authenticate/proceed',
        data: {
          data: {
            authSessionToken: data.data.authSessionToken,
            login,
            password,
            channel: 'ib',
          },
          accessToken: null,
        },
      });
      console.log('response', response);
    },
    /**
     * обновление статуса текущего запроса к API
     */
    setRequestInProgress({ commit }: {
      commit: Commit;
    }, value: boolean) {
      commit('updateRequestInProgress', value);
    },
  },
  mutations: {
    updateAuthPhone(state: Auth, value: string): void {
      state.phone = value;
    },
    [SET_AUTH_CONSENT](state: Auth, value: boolean): void {
      state.consent = value;
    },
    resetAuthState(state: Auth): void {
      Object.assign(state, defaultAuthState());
    },
    setAuth(state: Auth, value) {
      const newValue = value.data;
      // newValue.userProfileList[0].externalId = '2-53K1TBY-4';
      newValue.userProfileList[0].siebelId = '2-53K1TBY';
      Object.assign(state, newValue);
    },
  },
};
