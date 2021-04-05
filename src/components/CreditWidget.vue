<template>
  <div
    :class="$style['credit-block']"
    :serialNumber="serialNumber"
    @click="handleShowInfo"
  >
    <div :class="$style.credit">
      <div :class="$style.top">
        <span :class="$style.amount">{{ amountWithFormat }}</span>
        <div>
          <span :class="$style['date-text']">Обновлен </span>
          <span :class="$style.date">{{ startDateWithFormat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moneyFormat from '@/utils/money-formatter';
import { formatDate, diffDatesInDays } from '@/utils/date-utils';

export default {
  name: 'CreditWidget',
  props: {
    isVisible: {
      type: Boolean,
    },
    monthlyPayment: {
      type: Number,
      default: 0.00,
    },
    amount: {
      type: [Number, String],
      default: 0.00,
    },
    startDate: {
      type: String,
      default: '',
    },
    payDate: {
      type: String,
      default: '',
    },
    payDay: {
      type: Number,
      default: 1,
    },
    serialNumber: {
      type: Number,
      default: 0,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    amountWithFormat() {
      return moneyFormat(this.amount, true);
    },
    monthlyPaymentWithFormat() {
      return moneyFormat(this.monthlyPayment, true);
    },
    startDateWithFormat() {
      return formatDate(this.startDate);
    },
    nextPayDateWithFormat() {
      return `До ${formatDate(this.payDate, {
        day: 'numeric',
        month: 'long',
      })} через ${this.getDiffDatesInDays} дней`;
    },
    getDiffDatesInDays() {
      return diffDatesInDays(this.payDate);
    },
  },
  mounted() {
    console.log('this.edit', this.edit);
    console.log('this.id', this.id);
  },
  methods: {
    handleClick() {
      this.$emit('takeMoney');
    },
    handleShowInfo(event) {
      this.$emit('click', Number(event.currentTarget.attributes.serialnumber.value));
    },
    handlePay(event) {
      this.$emit('pay', Number(event.target.attributes.serialnumber.value));
    },
  },
};
</script>

<style module lang="scss">
  .credit-block {
    // padding: 8px 0;
    background-color: $WHITE;
    // border-radius: 8px;
    // margin: 8px 0;
  }

  .credit {
    .top {
      padding: 16px;
      display: flex;
      flex-direction: rows;
      justify-content: space-between;
      align-items: center;

      .amount {
        font-family: Squad;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.2px;
        color: $BLACK;
      }

      .date {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        text-align: right;
        letter-spacing: -0.2px;
        color: $APPLE;
      }
    }

    .bottom {
      display: grid;
      grid-template-columns: 55% auto;
      padding: 0 16px;
      align-items: center;

      .credit-info {
        display: flex;
        flex-direction: column;

        .title {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
          text-align: left;
          letter-spacing: -0.2px;
        }

        .info {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: -0.2px;
          text-align: left;
          color: $TUNDORA;
        }
      }
    }
  }

  .date-text {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    text-align: right;
    letter-spacing: -0.2px;
    // color: $APPLE;
  }
</style>
