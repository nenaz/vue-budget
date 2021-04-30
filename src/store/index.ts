import Vue from 'vue';
import Vuex, {
  StoreOptions,
  Commit,
  Dispatch,
} from 'vuex';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { getField, updateField } from 'vuex-map-fields';
import Cookies from 'js-cookie';
import {
  axiosPost,
  axiosPostAuth,
  axiosGet,
  cancelObj,
} from '@/utils/server-interaction';
import { router } from '@/router';
import { redirectToInfoWithParams } from '@/utils/route-utils';
import { modules } from './modules/index';
import mutationTypes from './mutation-types';
import {
  RootState,
  DefaultClientData,
  Modal,
  SendSMSStatus,
  TabValues,
  TabsChangedJob,
  Line,
  Dictionary,
  Errors,
} from './types';

Vue.use(Vuex);

// const errorCodes = [200, 201, 202, 204, 401, 403, 404, 406, 409, 500];

const REQUESTS_MAX_COUNTS = 15;

const {
  HIDE_LOADER,
  SET_CREDIT_TERM,
  SET_DOCUMENTS_LIST_CREDIT,
  SET_MODAL_STATUS,
  SET_MONTH_PAY,
  SET_PHONE_NUMBER,
  SET_SIGN_RES,
  SHOW_LOADER,
  SIGN_SESSION,
  UPDATE_CREDIT_AMOUNT,
  SET_DOCUMENTS_LIST_VCARD,
  SET_OFFER,
  SET_CREDITS,
  SET_VCARDS,
  RESET_STATE,
  SMS_SEND,
  SET_VCARD_CONSENT,
  SET_CREDIT_CONSENT,
  SET_BKI_CONSENT,
  SET_STEP,
  SET_ACTIVE_TAB,
  UPDATE_MONTHLY_PAYMENT,
  UPDATE_INDUSTRY,
  UPDATE_OWNERSHIP,
  UPDATE_POSITION,
  UPDATE_MANUAL_MONTHLY_PAYMENT,
  SET_CREDIT_OVERPAYMENT,
  SET_CHANGED_JOB,
  SET_IS_CHANGED_JOB,
  HIDE_MENU,
  SHOW_MENU,
} = mutationTypes;

const defaultClientData = (): DefaultClientData => ({
  creditAmount: 0,
  term: 12,
  creditCode: '',
  activeTab: TabValues.AMOUNT,
  monthlyPayment: 1000,
});

const defaultPlaceWorkData = () => ({
  income: 0,
  isChangedJob: false,
  tabChangedJob: TabsChangedJob.NO_CHANGED,
  address: '',
  organization: '',
  specialization: {},
  experience: 0,
  sector: {},
  ownership: {},
  phone: '',
  position: {},
  bkiConsent: false,
});

const defaultState = (): RootState => ({
  loaderObject: {
    hide: true,
    description: '',
  },
  verificationCode: '',
  creditParams: {
    term: 12,
    creditAmount: 0,
    calcMonthlyPayment: 0,
    manualMonthlyPayment: 2000,
    activeTab: TabValues.AMOUNT,
    overpayment: '0.00',
  },
  placeOfWorkAndIncome: defaultPlaceWorkData(),
  credit: {
    email: '',
    offerConsent: false,
    vcardConsent: false,
  },
  monthPay: '0',
  authStatus: !!Cookies.get('accessToken'),
  documentList: [],
  documentListVcard: [],
  modal: {
    isModalVisible: false,
    title: '',
    data: [],
    mutationName: '',
    component: null,
  },
  hideLoader: true,
  credits: [],
  vcards: [],
  offer: {},
  smsSendStatus: {
    count: 0,
    code: 0,
    status: '',
    message: '',
  },
  steps: {
    current: 1,
    total: 3,
  },
  line: {
    limit: 0.00,
    debt: 0.00,
  },
  hideMenu: true,
  user: {
    hasLine: false,
    hasOffer: false,
    hasCard: false,
    hasCredits: false,
  },
  requestInProgress: false,
  cancelRequest: false,
  error: {},
  isRestart: false,
  hasCurrentTranche: false,
  repayment: {
    what: {},
    fromWhere: {},
    amount: 0,
    type: {},
  },
  requests: {
    previousRequestSuccessful: false,
    requestCounts: 0,
  },
});

export const mainStore: StoreOptions<RootState> = {
  state: {
    ...defaultState(),
  },
  mutations: {
    updateRequestCounts(state, value: number) {
      if (value === 0) {
        state.requests.requestCounts = 0;
      } else {
        state.requests.requestCounts = value;
      }
    },
    updatePreviousRequestSuccessful(state, value: boolean) {
      state.requests.previousRequestSuccessful = value;
    },
    updateCancelRequest(state, value: boolean) {
      state.cancelRequest = value;
    },
    resetPlaceWorkData(state) {
      Object.assign(state.placeOfWorkAndIncome, defaultPlaceWorkData());
    },
    setDefaultCreditParams(state) {
      Object.assign(state.creditParams, {
        term: 12,
        creditAmount: 0,
        calcMonthlyPayment: 0,
        manualMonthlyPayment: 2000,
        activeTab: TabValues.AMOUNT,
        overpayment: '0.00',
      });
    },
    updateRepayType(state, value) {
      state.repayment.type = value;
    },
    updateRepayAmount(state, value) {
      state.repayment.amount = value;
    },
    updateRepayFrom(state, value) {
      state.repayment.fromWhere = value;
    },
    updateRepayWhat(state, value) {
      state.repayment.what = value;
    },
    updateCurrentTrancheFlag(state, value) {
      state.hasCurrentTranche = value;
    },
    updateRestartFlag(state, value) {
      state.isRestart = value;
    },
    resetErrorObject(state) {
      state.error = {};
    },
    upStep(state) {
      const step = state.steps.current;
      state.steps.current = step + 1;
    },
    downStep(state) {
      const step = state.steps.current;
      state.steps.current = step - 1;
    },
    updateTotalStep(state, value: number) {
      state.steps.total = value;
    },
    updateAuthStatus(state, value: boolean) {
      state.authStatus = value;
    },
    resetVerificationCode(state) {
      state.verificationCode = '';
    },
    updateError(state, value) {
      state.error = value;
    },
    updateRequestInProgress(state, value: boolean) {
      state.requestInProgress = value;
    },
    updateCardStatus(state, value: boolean): void {
      state.user.hasCard = value;
    },
    updateCreditsStatus(state, value: boolean): void {
      state.user.hasCredits = value;
    },
    updateLineStatus(state, value: boolean): void {
      state.user.hasLine = value;
    },
    updateOfferStatus(state, value: boolean): void {
      state.user.hasOffer = value;
    },
    updateLine(state: RootState, value: Line) {
      state.line = value;
    },
    updateOffer(state, value: any): void {
      state.offer = value;
    },
    updatePlaceOfWorkAndIncome(state: RootState, value: any): void {
      Object.assign(state.placeOfWorkAndIncome, value);
    },
    updateSpecialization(state: RootState, value: Dictionary): void {
      state.placeOfWorkAndIncome.specialization = value;
    },
    updatePosition(state: RootState, value: Dictionary): void {
      state.placeOfWorkAndIncome.position = value;
    },
    updateIndustry(state: RootState, value: Dictionary): void {
      state.placeOfWorkAndIncome.sector = value;
    },
    updateOwnership(state: RootState, value: Dictionary): void {
      state.placeOfWorkAndIncome.ownership = value;
    },
    [SET_CHANGED_JOB](state: RootState, value: TabsChangedJob): void {
      state.placeOfWorkAndIncome.tabChangedJob = value;
    },
    [SET_IS_CHANGED_JOB](state: RootState, value: boolean): void {
      state.placeOfWorkAndIncome.isChangedJob = value;
    },
    [SET_CREDIT_OVERPAYMENT](state: RootState, value: string): void {
      state.creditParams.overpayment = value;
    },
    updateModalStatus(state: RootState, value: Modal): void {
      state.modal = value;
    },
    updateCreditTerm(state: RootState, value: Dictionary): void {
      state.creditParams.term = Number(value.title);
    },
    [SET_ACTIVE_TAB](state, value: TabValues) {
      state.creditParams.activeTab = value;
    },
    updateField,
    [RESET_STATE](state): void {
      Object.assign(state, defaultState());
    },
    [UPDATE_CREDIT_AMOUNT](state, value: number): void {
      state.creditParams.creditAmount = value;
    },
    updateIncome(state, value: number): void {
      state.placeOfWorkAndIncome.income = value;
    },
    [SET_DOCUMENTS_LIST_CREDIT](state, value: any[]): void {
      state.documentList = value;
    },
    [SET_CREDIT_TERM](state, value: number): void {
      updateField(state, {
        path: 'form.term',
        value,
      });
    },
    [HIDE_MENU](state): void {
      state.hideMenu = true;
    },
    [SHOW_MENU](state): void {
      state.hideMenu = false;
    },
    [HIDE_LOADER](state): void {
      state.loaderObject = {
        hide: true,
        description: '',
      };
    },
    [SHOW_LOADER](state, value = ''): void {
      state.loaderObject = {
        hide: false,
        description: value,
      };
    },
    [SET_MONTH_PAY](state, value: string) {
      state.creditParams.calcMonthlyPayment = Number(value);
    },
    [SET_DOCUMENTS_LIST_VCARD](state, value: any[]): void {
      state.documentListVcard = value;
    },
    [SET_OFFER](state, value: any): void {
      state.offer = value;
    },
    [SET_CREDITS](state, value: any[]): void {
      state.credits = value;
    },
    [SET_VCARDS](state, value: any[]): void {
      state.vcards = value;
    },
    [SMS_SEND](state, value: SendSMSStatus): void {
      state.smsSendStatus = {
        ...value,
      };
    },
    [SET_VCARD_CONSENT](state, value: boolean): void {
      state.credit.vcardConsent = value;
    },
    [SET_CREDIT_CONSENT](state, value: boolean): void {
      state.credit.offerConsent = value;
    },
    [SET_BKI_CONSENT](state, value: boolean): void {
      state.placeOfWorkAndIncome.bkiConsent = value;
    },
    [UPDATE_MONTHLY_PAYMENT](state: any, value: string) {
      state.creditParams.monthlyPayment = value;
    },
    [UPDATE_MANUAL_MONTHLY_PAYMENT](state: any, value: string) {
      state.creditParams.manualMonthlyPayment = value;
    },
    [UPDATE_INDUSTRY](state: any, value: string) {
      updateField(state, {
        path: 'form.placeOfWorkAndIncome.industry',
        value,
      });
    },
    [UPDATE_OWNERSHIP](state: any, value: string) {
      updateField(state, {
        path: 'form.placeOfWorkAndIncome.ownership',
        value,
      });
    },
    [UPDATE_POSITION](state: any, value: string) {
      updateField(state, {
        path: 'form.placeOfWorkAndIncome.position',
        value,
      });
    },
  },
  actions: {
    /**
     * @param param0
     */
    async fetchUserAccounts({ dispatch, rootState }: {
      dispatch: Dispatch;
      rootState: RootState;
    }) {
      // dispatch('setError', {});
      // const storageExtId = localStorage.getItem('externalId');
      // const externalId = get(rootState, 'auth.userProfileList[0].externalId', '2-53K1TBY-4');
      const userLogin = get(rootState, 'auth.login');
      const response = await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/accounts',
          data: {
            userLogin,
          },
        },
      });
      console.log('response', response);
      // if (!get(response, 'statusType')) {
      //   // if (get(response, 'errors')) {
      //   //   dispatch('setError', {
      //   //     statusType: 'error',
      //   //   });
      //   // }
      dispatch('setClientInstance', response);
    },

    async getCardsAndLoans({ commit, dispatch }: {
      dispatch: Dispatch;
      commit: Commit;
    }) {
      await dispatch('fetchGetCard');
      await dispatch('fetchGetCredits');
    },

    async serverAuthAPI({ commit, dispatch }: {
      commit: Commit;
      dispatch: Dispatch;
    }, value: any) {
      const result = await axiosPostAuth(value);
      const backUrl = router.currentRoute.path;
      console.log('result', result);

      if (result) {
        const data = get(result, 'data');
        const status = get(result, 'status');

        if (status >= 400 && status <= 500 && status !== 409) {
          const errResult = {
            ...data,
            status,
            statusType: 'error',
            backUrl,
          };
          if (status === 403 || status === 404) {
            errResult.backUrl = '/';
            errResult.reset = true;
          }
          console.log(' serverAuthAPI ERROR ', status);
          dispatch('setError', errResult);
          // const routerParams = redirectToInfoWithParams({
          //   from: backUrl,
          //   status,
          //   requestUrl: result.request.responseURL,
          //   error: errResult,
          // });
          // console.log('routerParams', routerParams);
          // dispatch('routeTo', routerParams);
          return errResult;
        }
        return result;
      }

      console.log(' serverAuthAPI CANCEL OR XZ ');
      dispatch('setError', {
        status: Errors.CANCELED,
        statusType: Errors.CANCELED,
      });
      const routerParams = redirectToInfoWithParams({
        from: backUrl,
        status: Errors.CANCELED,
        requestUrl: result?.request?.responseURL || '/',
      });
      console.log('routerParams', routerParams);
      dispatch('routeTo', routerParams);
      return null;
    },
    /**
     * Запрос к основному API
     * сброс ошибок
     * сброс флага предыдущего запроса
     * установка количества запросов в state из локального state
     * проверка количества запросов на 1 урл
     * выбор метода запроса
     * если нет резуотата запроса - запрос прерван
     * если результат есть и статус не из списка -
     * выставить флаг предыдущего запроса в true,
     * сросить счетчик количества запросов на урл
     * вурнуть результат
     * если запрос из списка статусов -
     * добавить в ответ данные для обработки ошибки
     * получить данные по редиректу и параметры для отображения на страницы ошибки
     * редирект
     */
    async serverCommonAPI({ dispatch, state }: {
      dispatch: Dispatch;
      state: RootState;
    }, value: any) {
      let result;
      dispatch('setError', {});
      dispatch('setPreviousRequestSuccessful', false);
      const requestCounts = get(value, 'options.requestCounts', 0);
      dispatch('setRequestCounts', requestCounts);
      console.log('state.requests.requestCounts', state.requests.requestCounts);
      if (state.requests.requestCounts > REQUESTS_MAX_COUNTS) {
        console.log('router.currentRoute.path', router.currentRoute.path);
        const errResult = {
          status: Errors.TIMEOUT,
          statusType: Errors.TIMEOUT,
          backUrl: router.currentRoute.path,
          reset: true,
        };
        dispatch('setError', errResult);
        const routerParams = redirectToInfoWithParams({
          from: router.currentRoute.path,
          status: Errors.TIMEOUT,
        });
        console.log('routerParams', routerParams);
        dispatch('routeTo', routerParams);
        dispatch('resetRequestCounts');
        return null;
      }
      if (value.type === 'POST') {
        result = await axiosPost(value.params, value.options);
      } else if (value.type === 'GET') {
        result = await axiosGet(value.params, value.options);
      }

      if (result) {
        const data = get(result, 'data');
        const status = get(result, 'status');
        const backUrl = router.currentRoute.path;

        if (status >= 400 && status <= 500 && status !== 409) {
          const errResult = {
            ...data,
            status,
            statusType: 'error',
            backUrl,
          };
          const routerParams = redirectToInfoWithParams({
            from: backUrl,
            status,
            requestUrl: result.request.responseURL,
            error: errResult,
          });
          console.log('routerParams', routerParams);
          dispatch('routeTo', routerParams);
          dispatch('resetRequestCounts');
          dispatch('setError', errResult);
          return errResult;
        }
        dispatch('setPreviousRequestSuccessful', true);
        dispatch('resetRequestCounts');
        return data;
      }

      dispatch('setError', {
        status: Errors.CANCELED,
        statusType: Errors.CANCELED,
      });
      dispatch('resetRequestCounts');
      return null;
    },
    setCancelRequest({ commit }: {
      commit: Commit;
    }, cansel: boolean) {
      commit('updateCancelRequest', cansel);
    },
    cancelRequest({ dispatch }: {
      dispatch: Dispatch;
    }) {
      cancelObj.cancel();
    },
    setError({ commit }: { commit: Commit }, value) {
      commit('updateError', value);
    },
    setPosition({ commit }: { commit: Commit }, value: string) {
      commit(UPDATE_POSITION, value);
    },
    setIndustry({ commit }: { commit: Commit }, value: string) {
      commit(UPDATE_INDUSTRY, value);
    },
    setOwnership({ commit }: { commit: Commit }, value: string) {
      commit(UPDATE_OWNERSHIP, value);
    },
    setPhoneNumber({ commit }: { commit: Commit }, phoneNumber: string) {
      commit(SET_PHONE_NUMBER, phoneNumber);
    },
    resetState({ commit, dispatch }: {
      commit: Commit;
      dispatch: Dispatch;
    }) {
      commit('resetAuthState');
      commit('resetTrancheState');
      commit('resetClientState');
      commit(RESET_STATE);
      dispatch('removeAuthInfo');
      console.log('resetState');
    },
    setActiveTab({ commit }: { commit: Commit }, value: string) {
      commit(SET_ACTIVE_TAB, value);
    },
    setMonthPay({ commit }: { commit: Commit }, value: string) {
      commit(SET_MONTH_PAY, value);
    },
    setCreditAmount({ commit }: { commit: Commit }, value: string) {
      commit(UPDATE_CREDIT_AMOUNT, value);
    },
    setModalStatus({ commit }: { commit: Commit }, modalStatus: boolean) {
      commit(SET_MODAL_STATUS, modalStatus);
    },
    loaderHide({ commit }: { commit: Commit }) {
      commit(HIDE_LOADER);
    },
    loaderShow({ commit }: { commit: Commit }) {
      commit(SHOW_LOADER);
    },
    setStep({ commit }: { commit: Commit }, newStepNumber: number) {
      commit(SET_STEP, newStepNumber);
    },
    setBKIConsent({ commit }: { commit: Commit }, value: boolean) {
      commit(SET_BKI_CONSENT, value);
    },
    setCurrentTrancheFlag({ commit }: { commit: Commit }, value: boolean) {
      this.commit('updateCurrentTrancheFlag', value);
    },
    resetCreditParams({ commit }) {
      commit('setDefaultCreditParams');
    },
    setPlaceWorkData({ commit }) {
      commit('resetPlaceWorkData');
    },
    setPreviousRequestSuccessful({ commit }, value: boolean) {
      commit('updatePreviousRequestSuccessful', value);
    },
    routeTo({ commit }, routerParams: any): void {
      if (!isEmpty(routerParams)) {
        router.replace({
          name: routerParams.name,
          params: {
            ...routerParams.params,
          },
        });
      }
    },
    setRequestCounts({ commit }: {
      commit: Commit;
    }, count: number) {
      commit('updateRequestCounts', count);
    },
    resetRequestCounts({ commit }: { commit: Commit }) {
      commit('updateRequestCounts', 0);
    },
  },
  modules: {
    ...modules,
  },
  getters: {
    getField,
    getLoader: (data) => data.loaderObject,
    getOfferAmount: (data) => (
      get(data, 'offer.offerAmount', 0)
    ),
    getDocumentListVcard: (data) => (
      data.documentListVcard
    ),
    getAuthStatus: (data) => (
      data.authStatus
    ),
    getDocumentList: (data) => (
      data.documentList
    ),
    getMonthPay: (data) => (
      data.monthPay
    ),
    getCredits: (data) => (
      get(data, 'credits', [])
    ),
    getVCards: (data) => (
      get(data, 'vcards', [])
    ),
  },
};

export const store = new Vuex.Store<RootState>(mainStore);
