export interface Auth {
  birthDate: string;
  consent: boolean;
  login: string;
  password: string;
  phone: string;
  sessionList?: any[];
  userProfileList?: any[];
}

export interface AuthenticateResponse {
  confirmation?: {
    deliveryChannel: string;
    isConfirmed: boolean;
    next: string;
    recipient: string;
    token: string;
  };
  data: {
    authCredentialType?: string;
    authSessionToken?: string;
    exceptionList?: any[];
  };
  errorCode?: number;
  errorMessage?: string;
  requestId: string;
}

type validationErrorList = {
  fieldName: string;
  messages: string[];
};

type userProfileList = {
  avatar: string | null;
  birthDate: string;
  blockChannels: any[];
  disableOtpLoginChannels: string | null;
  email: string;
  externalId: string;
  firstName: string;
  gender: string;
  id: number;
  insuranceId: string | null;
  irstAuth: boolean;
  isEmailConfirmed: boolean;
  lastLoggedIn: string;
  lastName: string;
  login: string;
  loginNotificationEnable: any[];
  middleName: string;
  phone: string;
  phoneUnmasked: string;
  regionId: string | null;
  siebelId: string | null;
  smsInfo: string | null;
  taxPayerId: string | null;
};

type SessionList = {
  accessToken: string;
  active: boolean;
  authorization: string;
  channel: string;
  createdAt: string;
  expireAt: string;
  id: number;
  isLoggedIn: boolean;
  lastActivityAt: string;
  personId: number;
  refreshToken: string;
  userId: number;
};

export interface ProccedResponse {
  confirmation: {
    deliveryChannel: string;
    isConfirmed: boolean;
    next: string;
    recipient: string;
    token: string;
  };
  data: {
    sessionList?: SessionList[];
    userProfileList?: userProfileList[];
    validationErrorList?: validationErrorList[];
  };
  errorCode?: number;
  errorMessage?: string;
  requestId: string;
}
