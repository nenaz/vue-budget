<template>
  <page>
    <template v-slot:header>
      <page-header
        :showBack="true"
        :showMenu="true"
      />
      <credit-widget
        :monthly-payment="currentCredit.nextPayment"
        :amount="currentCredit.amount"
        :start-date="currentCredit.beginDate"
        :pay-date="currentCredit.nextDate"
      />
    </template>
    <template v-slot:body>
      <page-body-content
        text="Детали кредита"
      >
        <details1
          :details="createDetails"
        />
      </page-body-content>
      <page-body-content
        text="График платежей"
      >
        <payment-schedule
          :schedule="schedule"
        />
      </page-body-content>
      <!-- <page-body-content
        text="Документы по кредиту"
      >
        <document-link-list
          :documents="documents"
        />
      </page-body-content> -->
      <functional-buttons-module
        :items="items"
        @click="handleItemClick"
      />
    </template>
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import get from 'lodash.get';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import CreditWidget from '@/components/CreditWidget';
import PageBodyContent from '@/components/PageBodyContent';
// import DocumentLinkList from '@/components/DocumentLinkList';
import Details1 from '@/components/Details';
import PaymentSchedule from '@/components/PaymentSchedule';
import moneyFormat from '@/utils/money-formatter';
import { FunctionalButtonsModule } from '@/modules/functional-buttons';
import { sumOfAllLoans } from '@/utils/sum-all-loans';
import { MIN_SUM_FOR_CREDIT } from '@/constants/constants';

export default {
  name: 'CreditDetails',
  components: {
    Page,
    PageHeader,
    CreditWidget,
    PageBodyContent,
    // DocumentLinkList,
    Details1,
    FunctionalButtonsModule,
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
    }),
    currentCredit() {
      return get(this, 'credits[this.id]', {});
    },
    createDetails() {
      const { amount, nextPayment } = this.currentCredit;
      return [
        {
          title: 'Сумма кредита',
          value: moneyFormat(amount, true),
        },
        {
          title: 'Процентная ставка',
          value: '-',
        },
        {
          title: 'Срок кредита',
          value: '-',
        },
        {
          title: 'Ежемесячный платеж',
          value: moneyFormat(nextPayment, true),
        },
        {
          title: 'Переплата',
          value: '-',
        },
      ];
    },
    sumAllLoans() {
      return sumOfAllLoans(this.credits);
    },
    getAvailableLimit() {
      return this.$store.state.clientInstance.line.limit;
    },
  },
  // beforeMount() {
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
  // },
  methods: {
    handleItemClick(value) {
      console.log('handleItemClick', value);
      this.$router.push(`/${value}`);
    },
  },
};
</script>

<style lang="scss" module>

</style>
