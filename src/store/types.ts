export enum Errors {
  // PHONE = 'не подтверждён телефон',
  // PASSPORT = 'просрочен паспорт на основе анализа даты выдачи',
  // OFFER = 'нет подходящего предложения',
  // PROFILE = 'не соответствует критериям выдачи',
  // OVERRIDE = 'есть новый Транш, заблокировавший этот',
  // MINOR = 'есть главный Транш, заблокировавший этот',
  // TIMEOUT = 'просрочен',
  CANCELED = 'CANCELED', // отменён принудительно
  // EXPIRED = 'просрочен',
  // SERVER = 'технический сбой',
  ERROR = 'error', // общая ошибка
  TIMEOUT = 'timeout', // ошибка времени ожидания
  // INTERNAL = 'Internal Server Error',
}

export interface Card {
  number4: string;
  balance: number;
  expire: string;
}

export interface DefaultClientData {
  creditAmount: number;
  term: number;
  creditCode: string;
  activeTab: string;
  monthlyPayment: number;
}

export interface Modal {
  isModalVisible: boolean;
  title: string;
  data: string[];
  mutationName?: string;
  component: any;
}

export interface SendSMSStatus {
  count: number;
  code: number;
  status: string;
  message: string;
}

// export interface Offer {
//   type: string;
//   text: string;
//   amount?: number;
// }

export enum TabValues {
  AMOUNT = 'amount',
  MONTH_PAY = 'month_payment',
  ONLINE = 'online',
  CASH = 'cash',
}

export enum TabsChangedJob {
  CHANGED = 'changed',
  NO_CHANGED = 'no changed',
}

interface Credit {
  dateStart: string;
  amount: number;
  monthlyPayment: number;
  payDate: string;
  payDay: number;
  info: any;
  name: string;
}

export interface Offer {
  amount: number;
  expire: string;
}

export interface Line {
  limit: number;
  debt: number;
  offer?: Offer;
}

export interface ClientProfile {
  first: string;
  middle: string;
  last: string;
  gender: string;
  email: string;
  phone: string;
}

export interface Loan {
  beginDate: string;
  nextDate: string;
  nextPayment: number;
  amount: number;
  debt: number;
}

export interface ClientInstanceRequest {
  externalId: string;
}

export interface ClientInstanceResponse {
  uuid?: string;
  activated?: string;
  profile?: ClientProfile;
  line?: Line;
  card?: Card;
  loans?: Loan[];
  errors?: any[];
}

export interface Dictionary {
  order?: number;
  title?: string;
  uuid?: string;
}

export interface Dictionaries {
  [key: string]: Dictionary[];
}

export interface RootState {
  accounts?: any;
  aperations?: any;
  verificationCode: string;
  creditParams: {
    term: number;
    creditAmount: number;
    calcMonthlyPayment: number;
    manualMonthlyPayment: number;
    activeTab: TabValues;
    overpayment: string;
  };
  placeOfWorkAndIncome: {
    income: number;
    isChangedJob: boolean;
    tabChangedJob: TabsChangedJob;
    address: string;
    organization: string;
    specialization: Dictionary;
    experience: number;
    sector: Dictionary;
    ownership: Dictionary;
    phone: string;
    position: Dictionary;
    bkiConsent: boolean;
  };
  credit: {
    email: string;
    offerConsent: boolean;
    vcardConsent: boolean;
  };
  auth?: any;
  authStatus: boolean;
  credits: Credit[];
  steps: {
    current: number;
    total: number;
  };
  documentList: any[];
  documentListVcard: any[];
  hideLoader: boolean;
  loaderObject: {
    hide: boolean;
    description: string;
  };
  modal: Modal;
  monthPay: string;
  offer: any;
  smsSendStatus: SendSMSStatus;
  vcards: any[];
  line?: Line;
  hideMenu: boolean;
  user: {
    hasLine: boolean;
    hasOffer: boolean;
    hasCard: boolean;
    hasCredits: boolean;
  };
  clientInstance?: any;
  requestInProgress: boolean;
  signSend?: {
    extId?: string;
    id?: string;
    created: string;
    expired: string;
  };
  error?: any;
  tranche?: any;
  isRestart: boolean;
  hasCurrentTranche: boolean;
  cancelRequest: boolean;
  repayment: {
    what: Dictionary;
    fromWhere: Dictionary;
    amount: number;
    type: Dictionary;
  };
  requests: {
    previousRequestSuccessful: boolean;
    requestCounts: number;
  };
}
