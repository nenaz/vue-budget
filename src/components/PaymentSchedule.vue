<template>
  <div :class="$style['payment-schedule']">
    <span :class="$style.payday">{{ day }}</span>
    <div
      :class="$style.line"
      v-for="(operation) in currentOperations"
      :key="operation._id"
    >
      <div>
        <img
          v-if="operation.status !== 'planned'"
          :src="getImgUrl(operation.status)"
          :alt="operation.status"
        />
      </div>
      <div :class="$style['description-block']">
        <span :class="$style['operation-name']">
          <!-- {{ getCategoryById(operation.category).title }} -->
          {{ operation.category }}
        </span>
      </div>
      <span :class="$style.amount">{{ operationAmountWithFormat(operation.amount) }}</span>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
// import { mapFields } from 'vuex-map-fields';
import moneyFormat from '@/utils/money-formatter';
import { formatDate } from '@/utils/date-utils';
import {
  // LIST_CATEGORY_DEMO,
  // OPERATION_TYPES,
  LISTCATEGORY,
} from '@/dictionaries';

export default {
  name: 'PaymentSchedule', // опервции по счету
  props: {
    day: {
      type: String,
      default: '',
    },
    currentOperations: {
      type: Array,
      default: () => ([]),
    },
  },
  // data() {
  //   return {
  //     operations: [],
  //   };
  // },
  computed: {
    renderOperations() {
      // console.log('this.$store.getters.getOperations', this.$store.state.operations);
      // this.operations = Object.keys(this.currentOperations);
      return Object.keys(this.currentOperations);
    },
  },
  // async mounted() {
  //   await this.getDictionary();
  // },
  methods: {
    ...mapActions([
      'getDictionary',
    ]),
    operationAmountWithFormat(amount) {
      return moneyFormat(amount);
    },
    operationDateWithFormat(date) {
      return formatDate(date, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    },
    getImgUrl(status) {
      const images = require.context('../assets', false, /\.svg$/);
      const path = status === 'completed'
        ? 'icon-checked'
        : 'icon-alert';
      return images(`./${path}.svg`);
    },
    getCategoryById(id) {
      console.log('getCategoryById_id', id);
      return LISTCATEGORY.find((item) => item.value === id);
    },
  },
};
</script>

<style lang="scss" module>
  .payment-schedule {
    font-family: 'Source Sans Pro';
    margin-top: 5px;
    // border-radius: 5px;
    background-color: #F1F1F1;
    border-top: 1px solid;
    border-bottom: 1px solid;

    .line {
      display: grid;
      grid-template-columns: 25px auto 95px;
      border-bottom: 1px solid #F1F1F1;
      height: 55px;
      align-content: center;
      padding-right: 5px;
    }
  }

  .operation-name {
    text-align: left;
  }

  .amount {
    text-align: right;
  }

  .description-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
  }

  .payday {
    font-family: 'Squad';
    text-align: left;
    display: inline-block;
    width: 100%;
    font-weight: bold;
    background-color: white;
    box-sizing: border-box;
    padding: 3px;
  }
</style>
