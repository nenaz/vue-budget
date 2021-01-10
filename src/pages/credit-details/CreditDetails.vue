<template>
  <page>
    <template v-slot:header>
      <page-header
        :showBack="true"
        :showMenu="true"
      />
      <credit-widget
        :monthly-payment="currentCredit.nextPayment"
        :amount="currentAmout"
        :start-date="currentCredit.beginDate"
        :pay-date="currentCredit.nextDate"
      />
    </template>
    <template v-slot:body>
      <page-body-content
        text="Детали счета"
      >
        <details1
          :details="createDetails"
        />
      </page-body-content>
      <page-body-content
        text="Операции по счету"
      >
      <!-- {{ currentOperations }} -->
        <payment-schedule
          :currentOperations="operations"
        />
        <!-- {{ operations }} -->
        <!-- {{ this.getAvat }} -->
      </page-body-content>
      <!-- <page-body-content
        text="Документы по кредиту"
      >
        <document-link-list
          :documents="documents"
        />
      </page-body-content> -->
      <!-- <functional-buttons-module
        :items="items"
        @click="handleItemClick"
      /> -->
    </template>
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapGetters, mapActions } from 'vuex';
import get from 'lodash.get';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import CreditWidget from '@/components/CreditWidget';
import PageBodyContent from '@/components/PageBodyContent';
// import DocumentLinkList from '@/components/DocumentLinkList';
import Details1 from '@/components/Details';
import PaymentSchedule from '@/components/PaymentSchedule';
// import moneyFormat from '@/utils/money-formatter';
// import { FunctionalButtonsModule } from '@/modules/functional-buttons';
import { sumOfAllLoans } from '@/utils/sum-all-loans';
// import { MIN_SUM_FOR_CREDIT } from '@/constants/constants';
// import { store } from '@/store';

export default {
  name: 'CreditDetails',
  components: {
    Page,
    PageHeader,
    CreditWidget,
    PageBodyContent,
    // DocumentLinkList,
    Details1,
    // FunctionalButtonsModule,
    PaymentSchedule,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      schedule: [
        {
          payDate: '10.01.2020',
          amount: 3650,
          status: 'completed', // (inProcess) (completed)
        },
        {
          payDate: '10.01.2020',
          amount: 3650,
          status: 'completed', // (inProcess) (completed)
        },
        {
          payDate: '10.01.2020',
          amount: 3650,
          status: 'completed', // (inProcess) (completed)
        },
        {
          payDate: '10.01.2020',
          amount: 3650,
          status: 'completed', // (inProcess) (completed)
        },
        {
          payDate: '10.01.2020',
          amount: 3650,
          status: 'completed', // (inProcess) (completed)
        },
        {
          payDate: '10.01.2020',
          amount: 3650,
          status: 'inProcess', // (inProcess) (completed)
        },
        {
          payDate: '10.01.2020',
          amount: 3650,
          status: 'planned', // (inProcess) (completed)
        },
        {
          payDate: '10.01.2020',
          amount: 3650,
          status: 'planned', // (inProcess) (completed)
        },
      ],
      items: [
        {
          icon: 'icon-down',
          text: 'Взять сумму для покупок',
          link: 'credit-params',
          disabled: false,
        },
        {
          icon: 'icon-up',
          text: 'Досрочное погашение',
          link: 'repayment',
        },
        {
          icon: 'icon-help',
          text: 'Помощь',
          link: 'help',
        },
      ],
      documents: [
      ],
      operations: [],
    };
  },
  computed: {
    ...mapFields({
      credits: 'clientInstance.loans',
      authStatus: 'authStatus',
      operations: 'operations',
    }),
    ...mapGetters({
      getAccountById: 'getAccountById',
      getOperations: 'getOperations',
    }),
    currentCredit() {
      return get(this, 'credits[this.id]', {});
    },
    currentAmout() {
      const account = this.getAccountById(this.id);
      return account.amount;
    },
    currentOperations() {
      // return this.getOperations;
      console.log('this.$store.state', this.$store.state.operations);
      return this.$store.state.operations;
    },
    currentAccount() {
      console.log('getOperations', this.getOperations);
      return this.getAccountById(this.id);
    },
    createDetails() {
      const { amount, nextPayment } = this.currentCredit;
      console.log('this.currentAccount', this.currentAccount);
      return [
        {
          title: 'Статус',
          value: this.currentAccount.status,
        },
        {
          title: 'Валюта',
          value: this.currentAccount.currency.title,
        },
        {
          title: 'Название',
          value: this.currentAccount.name,
        },
        {
          title: 'Последнее обновление',
          value: this.currentAccount.lastUpdate,
        },
      ];
    },
    sumAllLoans() {
      return sumOfAllLoans(this.credits);
    },
    getAvailableLimit() {
      return this.$store.state.clientInstance.line.limit;
    },
    getAvat() {
      console.log('this.$store.state.operations', this.operations);
      return this.operations;
    },
  },
  async beforeMount() {
    console.log('beforeMount');
    await this.handleStartPage();
  },
  methods: {
    ...mapActions([
      'getOperationsByAccount',
    ]),
    handleItemClick(value) {
      console.log('handleItemClick', value);
      this.$router.push(`/${value}`);
    },
    async handleStartPage() {
    //   if (this.authStatus) {
    //     if (!this.credits.length) {
    //       this.$router.replace('/main');
    //     }
    //     if (this.getAvailableLimit && this.credits.length) {
    //       // ПЕРЕДЕЛАТЬ НОРМАЛЬНО!!!!
    //       this.items[0].disabled = (this.getAvailableLimit - this.sumAllLoans)
    //  <= MIN_SUM_FOR_CREDIT;
    //     }
    //   } else {
    //     this.$router.replace('/');
    //   }
      this.$store.dispatch('setRequestInProgress', true);
      console.log('[START] getOperationsByAccount');
      this.operations = await this.getOperationsByAccount(this.id);
      console.log('[COMPLETE] getOperationsByAccount');
      this.$store.dispatch('setRequestInProgress', false);
    },
  },
};
</script>

<style lang="scss" module>

</style>
