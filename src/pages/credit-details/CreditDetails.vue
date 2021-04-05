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
          <div style="display: flex; flex-direction: row; justify-content: space-around;">
            <div
              v-for="(item) in items"
              :key="item.icon"
            >
              <base-button type="fab" @click="item.handleName">
                {{ item.text }}
              </base-button>
            </div>
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
            <payment-schedule
              v-for="day in Object.keys(operations)"
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

export default {
  name: 'CreditDetails',
  components: {
    Page,
    PageHeader,
    CreditWidget,
    PageBodyContent,
    // Details1,
    PaymentSchedule,
    PageBodyContentRollUp,
    BaseButton,
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
        },
        {
          icon: 'icon-up',
          text: 'Edit',
          link: 'repayment',
          handleName: this.handleEditClick,
        },
        {
          icon: 'icon-help',
          text: 'Add',
          link: 'help',
          handleName: this.handleAddOperation,
        },
      ],
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
    this.$store.dispatch('setRequestInProgress', false);
  },
  methods: {
    ...mapActions([
      'getOperationsByAccount',
      'deleteThisAccount',
      'editThisAccount',
    ]),
    handleItemClick(value) {
      this.$router.push(`/${value}`);
    },
    currentOperation(name) {
      // const { operations } = this.$store.state;
      return this.operations[name];
    },
    getOperationDays() {
      console.log('Object.keys(this.operations)', Object.keys(this.operations));
      return this.operations;
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
      // this.$router.push('/operation/add');
      this.$router.push({
        path: `/operation/add?accountId=${this.id}`,
        props: (route) => {
          console.log('route.query', route);
          return ({
            accountId: route.query.id,
          });
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
