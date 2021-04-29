<template>
  <page>
    <template v-slot:header>
      <page-header
        :showBack="true"
        :title="currentAccount.name"
      />
      <credit-widget
        :monthly-payment="currentCredit.nextPayment"
        :amount="currentAmout"
        :start-date="currentAccount.lastUpdate"
        :pay-date="currentCredit.nextDate"
      />
    </template>
    <template v-slot:body>
      <!-- <page-body-content
        text="Детали счета"
      >
        <details1
          :details="createDetails"
        />
      </page-body-content> -->
        <page-body-content-roll-up>
          <div style="display: flex; flex-direction: row; justify-content: center;">
            <template
              v-for="(item) in items"
            >
              <base-button
                :key="item.icon"
                type="fab"
                @click="item.handleName"
                v-if="item.types.includes(currentAccount.type.uuid)"
              >
                {{ item.text }}
              </base-button>
            </template>
        </div>
      </page-body-content-roll-up>
      <div
        v-if="length"
        style="height: calc(100vh - 211px); overflow: hidden;"
      >
        <page-body-content
          text="Операции по счету"
        >
          <div :class="$style.accounts" v-if="!requestInProgress">
            <!-- <operations-list
              :tableData="tableData"
            /> -->
            <payment-schedule
              v-for="day in getOperationDays()"
              :key="day"
              :currentOperations="currentOperation(day)"
              :day="day"
            />
          </div>
        </page-body-content>
      </div>
      <div v-else>
        <page-body-content
          text="Пока нет ни одной операции"
        ></page-body-content>
      </div>
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
import PageBodyContentRollUp from '@/components/PageBodyContentRollUp';
// import Details1 from '@/components/Details';
import PaymentSchedule from '@/components/PaymentSchedule';
import { formatDate } from '@/utils/date-utils';
// import { FloatingActionButton } from '@/components/buttons/floating-action-button';
import BaseButton from '@/components/BaseButton';
// import OperationsList from '@/modules/operations-list/OperationsList.vue';
// import { AccountTypes } from '@/dictionaries/type-of-account';
// import OperationPage from '../operation-page/OperationPage.vue';
import { ACCOUNT_TYPES } from './account-details-constants';

export default {
  name: 'AccountDetails',
  components: {
    Page,
    PageHeader,
    CreditWidget,
    PageBodyContent,
    // Details1,
    PaymentSchedule,
    PageBodyContentRollUp,
    BaseButton,
    // OperationsList,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [
        {
          icon: 'icon-down',
          text: 'Delete',
          link: 'credit-params',
          disabled: false,
          handleName: this.handleDeleteClick,
          types: [
            ACCOUNT_TYPES.default,
            ACCOUNT_TYPES.invest,
            ACCOUNT_TYPES.savings,
          ],
        },
        {
          icon: 'icon-up',
          text: 'Edit',
          link: 'repayment',
          handleName: this.handleEditClick,
          types: [
            ACCOUNT_TYPES.default,
            ACCOUNT_TYPES.invest,
            ACCOUNT_TYPES.savings,
          ],
        },
        {
          icon: 'icon-help',
          text: 'Add',
          link: 'help',
          handleName: this.handleAddOperation,
          types: [
            ACCOUNT_TYPES.default,
            ACCOUNT_TYPES.savings,
          ],
        },
        {
          icon: 'icon-invest',
          text: 'Invest',
          link: 'invest',
          handleName: this.handleInvestCorrect,
          types: [
            ACCOUNT_TYPES.invest,
          ],
        },
      ],
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      }, {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      }, {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      }, {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      }, {
        date: '2016-05-08',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      }, {
        date: '2016-05-06',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      }, {
        date: '2016-05-07',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      }],
    };
  },
  computed: {
    ...mapFields({
      credits: 'clientInstance.loans',
      authStatus: 'authStatus',
      operations: 'operations.data',
      length: 'operations.length',
      requestInProgress: 'requestInProgress',
    }),
    ...mapGetters({
      getAccountById: 'getAccountById',
      getOperationsLength: 'getOperationsLength',
    }),
    currentCredit() {
      return get(this, 'credits[this.id]', {});
    },
    currentAmout() {
      const account = this.getAccountById(this.id);
      return account.amount;
    },
    currentAccount() {
      const result = this.getAccountById(this.id);
      console.log('result', result);
      return result;
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
          title: 'Открыт',
          value: formatDate(this.currentAccount.createDate, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }),
        },
        // {
        //   title: 'Последнее обновление',
        //   value: formatDate(this.currentAccount.lastUpdate, {
        //     year: 'numeric',
        //     month: 'numeric',
        //     day: 'numeric',
        //   }),
        // },
      ];
    },
  },
  async beforeMount() {
    console.log('beforeMount', this.id);
    console.log('beforeMount', this.edit);
    this.$store.dispatch('setRequestInProgress', true);
    await this.getOperationsByAccount(this.id);
    await this.getDictionary('category');
    this.$store.dispatch('setRequestInProgress', false);
  },
  methods: {
    ...mapActions([
      'getOperationsByAccount',
      'deleteThisAccount',
      'editThisAccount',
      'getDictionary',
    ]),
    handleItemClick(value) {
      this.$router.push(`/${value}`);
    },
    currentOperation(date) {
      return this.operations[date];
    },
    getOperationDays() {
      const oper = Object.keys(this.operations);
      const sortOpers = oper.sort((a, b) => {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
      });
      return sortOpers;
    },
    async handleDeleteClick() {
      await this.deleteThisAccount(this.id);
      this.$router.push('/main');
    },
    handleEditClick() {
      this.$router.push({
        name: 'EditAccountPage',
        params: {
          edit: 'edit',
        },
      });
      // this.editThisAccount(this.id);
    },
    handleAddOperation() {
      this.$router.push({
        path: `/operation/add/${this.id}`,
      });
    },
    handleInvestCorrect() {
      this.$router.push({
        name: 'EditAccountPage',
        params: {
          edit: 'edit',
          invest: true,
        },
      });
    },
  },
};
</script>

<style lang="scss" module>
  .accounts {
    // background-color: red;
    // border: 1px solid;
    // padding: 2px;
    overflow-x: scroll;
    height: calc(100% - 30px);
    overflow-y: scroll;
  }
</style>
