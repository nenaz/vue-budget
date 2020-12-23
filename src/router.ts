import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { MainPage } from '@/pages/main-page';
import { CreditInfoSignPage } from '@/pages/credit-info-sign-page';
import { VirtualCardPage } from '@/pages/virtual-card-page';
import InfoPage from '@/pages/info-page';
import IncomePage from '@/pages/income-page';
import { WorkPlacePage } from '@/pages/work-place-page';
import { AuthPage } from '@/pages/auth-page';
import { VerificationPage } from '@/pages/verification-page';
import { CreditParamsPage } from '@/pages/credit-params-page';
import { NoLinePage } from '@/pages/no-line-page';
import { CreditDetails } from '@/pages/credit-details';
import { CardDetails } from '@/pages/card-details';
import { LoanPaymentPage } from '@/pages/loan-payment-page';
import PdfViewPage from '@/pages/pdf-view-page';
import OfferPage from '@/pages/offer-page';
import { HelpPage } from '@/pages/help-page';
import RepayPage from '@/pages/repay-page';
import { TestsPage } from '@/pages/tests-page';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Auth',
    component: AuthPage,
  },
  {
    path: '/verification',
    name: 'VerificationPage',
    component: VerificationPage,
  },
  {
    path: '/credit-params',
    name: 'CreditParamsPage',
    meta: {
      requiresAuth: true,
    },
    component: CreditParamsPage,
  },
  {
    path: '/main',
    name: 'Main',
    props: true,
    meta: {
      requiresAuth: true,
    },
    component: MainPage,
  },
  {
    path: '/credit-sign',
    name: 'CreditInfoSignPage',
    meta: {
      requiresAuth: true,
    },
    component: CreditInfoSignPage,
  },
  {
    path: '/virtual-card',
    name: 'VirtualCardPage',
    meta: {
      requiresAuth: true,
    },
    component: VirtualCardPage,
  },
  {
    path: '/info',
    name: 'Info',
    props: true,
    meta: {
      requiresAuth: true,
    },
    component: InfoPage,
  },
  {
    path: '/income',
    name: 'IncomePage',
    meta: {
      requiresAuth: true,
    },
    component: IncomePage,
  },
  {
    path: '/work-place',
    name: 'WorkPlacePage',
    meta: {
      requiresAuth: true,
    },
    component: WorkPlacePage,
  },
  {
    path: '/reject',
    name: 'NolinePage',
    component: NoLinePage,
  },
  {
    path: '/credit-details/:id',
    name: 'CreditDetails',
    props: true,
    meta: {
      requiresAuth: true,
    },
    component: CreditDetails,
  },
  {
    path: '/card-details',
    name: 'CardDetails',
    props: true,
    meta: {
      requiresAuth: true,
    },
    component: CardDetails,
  },
  {
    path: '/payment-method',
    name: 'LoanPaymentPage',
    meta: {
      requiresAuth: true,
    },
    component: LoanPaymentPage,
  },
  {
    path: '/pdf-view/:uuid',
    props: true,
    name: 'PdfViewPage',
    meta: {
      requiresAuth: true,
    },
    component: PdfViewPage,
  },
  {
    path: '/offers',
    props: true,
    name: 'OfferPage',
    meta: {
      requiresAuth: true,
    },
    component: OfferPage,
  },
  {
    path: '/help',
    props: true,
    name: 'HelpPage',
    meta: {
      requiresAuth: true,
    },
    component: HelpPage,
  },
  {
    path: '/repayment',
    name: 'RepayPage',
    meta: {
      requiresAuth: true,
    },
    component: RepayPage,
  },
  {
    path: '/tests-unit',
    name: 'TestsPage',
    component: TestsPage,
  },
];

export const router = new VueRouter({
  mode: 'hash',
  base: process.env.VUE_APP_BASE_PATH,
  routes,
});
