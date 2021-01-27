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
      <div :class="$style.accounts" v-if="!requestInProgress">
        <payment-schedule
          v-for="day in getOperationDays"
          :key="day"
          :currentOperations="currentOperation(day)"
          :day="day"
        />
      </div>
      </page-body-content>
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
import Details1 from '@/components/Details';
import PaymentSchedule from '@/components/PaymentSchedule';

export default {
  name: 'CreditDetails',
  components: {
    Page,
    PageHeader,
    CreditWidget,
    PageBodyContent,
    Details1,
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
    };
  },
  computed: {
    ...mapFields({
      credits: 'clientInstance.loans',
      authStatus: 'authStatus',
      operations: 'operations',
      requestInProgress: 'requestInProgress',
    }),
    ...mapGetters({
      getAccountById: 'getAccountById',
    }),
    currentCredit() {
      return get(this, 'credits[this.id]', {});
    },
    currentAmout() {
      const account = this.getAccountById(this.id);
      return account.amount;
    },
    getOperationDays() {
      return Object.keys(this.operations);
    },
    currentAccount() {
      return this.getAccountById(this.id);
    },
    createDetails() {
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
  },
  async beforeMount() {
    console.log('beforeMount', this.id);
    this.$store.dispatch('setRequestInProgress', true);
    await this.getOperationsByAccount(this.id);
    this.$store.dispatch('setRequestInProgress', false);
  },
  methods: {
    ...mapActions([
      'getOperationsByAccount',
    ]),
    handleItemClick(value) {
      this.$router.push(`/${value}`);
    },
    currentOperation(name) {
      const { operations } = this.$store.state;
      return operations[name];
    },
  },
};
</script>

<style lang="scss" module>
  .accounts {
    background-color: red;
    padding: 2px;
  }
</style>
