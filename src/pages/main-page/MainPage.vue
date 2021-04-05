<template>
  <page
    :is-grid-page="false"
    :grid-config="pageConfig"
  >
    <template v-slot:header>
      <page-header :showMenu="true" />
      <!-- <transition name="fade" mode="out-in">
        <header-placeholder v-if="requestInProgress" />
        <balance-line
          v-else
          :baseLimit="getAvailableLimit"
          :allCreditsAmount="sumAllLoans"
        />
      </transition> -->
    </template>
    <template v-slot:body>
      <!-- <transition name="fade" mode="out-in"> -->
      <!-- <transition-group name="fade" mode="in-out"> -->
        <card-placeholder v-if="requestInProgress" />
        <div class="accounts" v-else>
          <card-widget
            v-for="(account, key) in accounts"
            :key="key"
            title="Карты"
            :is-visible="true"
            :product-data="account"
            :is-active-status="isActiveStatus"
            @click="handleCardClick"
          />
          <card-widget
            :is-visible="true"
            :product-data="addAccount"
            :is-active-status="addAccount.isActiveStatus"
            @click="handleAddAccountClick"
          />
        </div>
      <!-- </transition> -->
      <!-- </transition-group> -->
      <div v-if="isActiveStatus">
        <transition name="fade" mode="in-out" v-if="requestInProgress">
          <credit-placeholder />
        </transition>
        <transition-group name="fade" mode="in-out" v-else>
          <template>
            <credit-widget
              v-for="(credit, key) in loans"
              :key="key"
              :serialNumber="key"
              :monthly-payment="credit.nextPayment"
              :amount="credit.amount"
              :start-date="credit.beginDate"
              :pay-date="credit.nextDate"
              @click="handleCreditClick"
              @pay="handleCreditPay"
            />
          </template>
        </transition-group>
        <template v-if="hasCurrentTranche">
          <transition name="fade" mode="in-out">
            <credit-placeholder v-if="requestInProgress" />
            <template v-else>
              <current-tranche-widget
                :amount="currentTrancheAmount"
                :start-date="currentTrancheStartDate"
                @click="handleCurrentTrancheClick"
                :in-progress="currentInProgress"
              />
            </template>
          </transition>
        </template>
      </div>
      <floating-action-button
        @click="handleAddOperation"
      >add</floating-action-button>
      <!-- <transition name="fade" mode="in-out">
        <functional-button-placeholder  v-if="requestInProgress" />
        <functional-buttons-module
          v-else
          :items="items"
        />
      </transition> -->
    </template>
  </page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Cookies from 'js-cookie';
import { mapFields } from 'vuex-map-fields';
import get from 'lodash.get';
// import isEmpty from 'lodash.isempty';
import moneyFormat from '@/utils/money-formatter';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
// import BalanceLine from '@/components/BalanceLine';
import CardWidget from '@/components/CardWidget';
import CreditWidget from '@/components/CreditWidget';
// import { FunctionalButtonsModule } from '@/modules/functional-buttons';
import { sumOfAllLoans } from '@/utils/sum-all-loans';
import { ErrorMessages } from '@/utils/error-messages';
// import { HeaderPlaceholder } from '@/components/placeholders';
import CurrentTrancheWidget from '@/components/CurrentTrancheWidget';
import { FloatingActionButton } from '@/components/buttons/floating-action-button';
// import { MIN_SUM_FOR_CREDIT } from '@/constants/constants';
// import { redirectToInfoWithParams } from '@/utils/route-utils';
import CardPlaceholder from './CardPlaceholder';
import CreditPlaceholder from './CreditPlaceholder';
// import FunctionalButtonPlaceholder from './FunctionalButtonPlaceholder';

export default {
  name: 'MainPage',
  components: {
    Page,
    PageHeader,
    // BalanceLine,
    CardWidget,
    CreditWidget,
    // FunctionalButtonsModule,
    // HeaderPlaceholder,
    CardPlaceholder,
    CreditPlaceholder,
    // FunctionalButtonPlaceholder,
    CurrentTrancheWidget,
    FloatingActionButton,
  },
  data() {
    return {
      pageConfig: {
        rowsCount: 4,
        flexibleRow: 3,
      },
      items: [
        {
          icon: 'icon-down',
          text: 'Взять сумму для покупок',
          link: 'credit-params',
          disabled: false,
        },
        {
          icon: 'icon-help',
          text: 'Помощь',
          link: 'help',
          disabled: false,
        },
      ],
      userName: 'MrNenaz',
      intervalId: '',
      count: 0,
      availableLimit: 189000,
      cardLastNum: '1896',
      isActive: false,
      test: this.$store.state.requestInProgress,
      createdM: false,
      beforeMountM: false,
      addAccount: {
        isActiveStatus: false,
        _id: 'new',
      },
    };
  },
  computed: {
    ...mapGetters([
      'getHasLine',
      'getHasOffer',
      'getHasCard',
      'getHasLoans',
    ]),
    ...mapFields({
      card: 'clientInstance.card',
      loans: 'clientInstance.loans',
      error: 'error.statusType',
      limit: 'clientInstance.line.limit',
      activated: 'clientInstance.activated',
      requestInProgress: 'requestInProgress',
      isRestart: 'isRestart',
      authStatus: 'authStatus',
      offer: 'clientInstance.line.offer',
      hasCurrentTranche: 'hasCurrentTranche',
      clientProfile: 'clientInstance.activated',
      currentTranche: 'tranche',
      accounts: 'accounts.allAccounts',
    }),
    getAvailableLimit() {
      return this.$store.state.clientInstance.line.limit;
    },
    isActiveStatus() {
      return true;
    },
    /**
     * временное решение, чтобы показать данные только что взятого кредита
     */
    cardObject() {
      return {
        balance: this.sumAllLoans,
        last4Digits: get(this.card, 'number4', ''),
      };
    },
    sumAllLoans() {
      return sumOfAllLoans(this.loans);
    },
    // пока нужно!!!!
    currentTrancheAmount() {
      return get(this.currentTranche, 'creditOffer.amount', 0);
    },
    // пока нужно!!!!
    currentTrancheStartDate() {
      const { activated } = this.currentTranche;
      return activated || '2020-12-12';
    },
    currentInProgress() {
      const { confirmed, signed } = this.currentTranche;
      return confirmed && !signed;
    },
  },
  // watch: {
  //   async requestInProgress(value) {
  //     console.log('watch activated', value);
  //     if (!value) {
  //       /**
  //        * замена || на && как временное решение для отладки
  //        */
  //       if ((!this.limit || isEmpty(this.offer)) && !this.requestInProgress) {
  //         this.$router.replace('/reject');
  //       } else if (this.limit && !isEmpty(this.offer) && !this.requestInProgress) {
  //         console.log('!requestInProgress');
  //         if (!this.getHasCard && !this.getHasLoans) {
  //           this.$router.push('/credit-params');
  //         }
  //       }
  //     }
  //   },
  //   // пока нужно!!!!
  //   async isRestart(value) {
  //     console.log('isRestart watch', value, this.authStatus, this.activated);
  //   // пока нужно!!!!
  //   // hasCurrentTranche(value) {
  //   //   if (value) {
  //   //     console.log('watch hasCurrentTranche');
  //   //     this.currentTranche = mockCurrentTranche;
  //   //   }
  //   },
  // },
  async beforeMount() {
    console.log('beforeMount');
    await this.handleStartPage();
  },
  methods: {
    ...mapActions([
      'createAndReceiveTranshCreationStatus',
      'fetchCurrentTracnheComposition',
      'getCurrentTransh',
      'mockAddInfoByUserLogin',
      'resetState',
      'resetStateTranche',
      'getAccounts',
    ]),
    goToBalancePage() {
      this.$router.push('/balance');
    },
    clickContainer() {
      this.$router.push('/promo');
    },
    getCreditAmount(amount) {
      return moneyFormat(amount, true);
    },
    goToLoginPage() {
      this.resetState();
      Cookies.remove('auth-token');
      this.$router.replace('/');
    },
    async handleItemClick(value) {
      if (value === this.items[0].link) {
        if (this.error === 'error') {
          this.$router.push(`/info/${this.error}`);
        } else {
          this.$router.push('/credit-params');
          // this.$store.dispatch('setRequestInProgress', true);
          // await this.createAndReceiveTranshCreationStatus();
          // this.$store.dispatch('setRequestInProgress', false);
        }
      } else {
        this.$router.push(`/${value}`);
      }
    },
    handleCreditClick(serialNumber) {
      this.$router.push({
        path: `credit-details/${serialNumber}`,
        serialNumber,
      });
    },
    handleCardClick(id) {
      console.log('handleCardClick');
      // this.$router.push('/card-details');
      this.$router.push({
        path: `account/${id}`,
        id,
      });
    },
    prepareErrorParams() {
      return this.clientInstanceError
        ? {
          errorMessages: ErrorMessages(this.clientInstanceError),
        }
        : {};
    },
    handleCreditPay() {
      console.log('handleCreditPay');
      this.$router.push('/payment-method');
    },
    async handleStartPage() {
      // if (!this.hasCurrentTranche) {
      //   this.resetStateTranche();
      // }
      // if (!this.authStatus) {
      //   const routerParams = redirectToInfoWithParams({
      //     from: '/main',
      //     status: 403,
      //   });
      //   console.log('routerParams', routerParams);
      //   this.$store.dispatch('routeTo', routerParams);
      // } else {
      //   this.$store.dispatch('setError', {});
      this.$store.dispatch('setRequestInProgress', true);
      //   if (this.authStatus) {
      await this.getAccounts();
      //     this.mockAddInfoByUserLogin();
      //     if (this.getAvailableLimit && this.loans.length) {
      //       this.items[0].disabled = (this.getAvailableLimit - this.sumAllLoans)
      //       <= MIN_SUM_FOR_CREDIT;
      //     }
      //   }
      // }
      this.$store.dispatch('setRequestInProgress', false);
    },
    handleCurrentTrancheClick() {
      const { confirmed, signed } = this.currentTranche;
      if (confirmed) {
        if (!signed) {
          this.$router.push('/credit-sign');
        }
      }
    },
    handleAddAccountClick() {
      console.log('handleAddAccountClick');
      this.$router.push('/account/add');
    },
    handleAddOperation() {
      console.log('click');
      this.$router.push('/operation/add');
    },
  },
};
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .accounts {
    display: grid;
    grid-template-columns: 50% 50%;
  }
</style>
