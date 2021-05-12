<template>
  <div :class="$style['payment-schedule']">
    <span :class="$style.payday">{{ day }}</span>
    <div
      :class="$style.line"
      v-for="(operation) in currentOperations"
      :key="operation._id"
    >
      <div :class="$style.icons" v-html="getOperIcon(operation)"></div>
      <div :class="$style['description-block']">
        <span :class="$style['operation-name']">
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
    getOperIcon({ isTransferOpertion, type }) {
      let result = '';
      if (isTransferOpertion) {
        result = '<i class="el-icon-refresh"></i>';
        result += type
          ? `<i class="el-icon-caret-top ${this.$style['up-icon']}"></i>`
          : `<i class="el-icon-caret-bottom ${this.$style['down-icon']}"></i>`;
      } else {
        result = type
          ? `<i class="el-icon-caret-top ${this.$style['up-icon']}"></i>`
          : `<i class="el-icon-caret-bottom ${this.$style['down-icon']}"></i>`;
      }
      return result;
    },
  },
};
</script>

<style lang="scss" module>
  .up-icon {
    color: #52AE30;
  }

  .down-icon {
    color: red;
  }

  .icons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    width: 40px;
  }

  .payment-schedule {
    font-family: 'Source Sans Pro';
    margin-top: 5px;
    // border-radius: 5px;
    background-color: #F1F1F1;
    border-top: 1px solid;
    border-bottom: 1px solid;

    .line {
      display: grid;
      grid-template-columns: 40px auto 95px;
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
