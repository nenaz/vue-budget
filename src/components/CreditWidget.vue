<template>
  <div
    :class="$style['credit-block']"
    :serialNumber="serialNumber"
    @click="handleShowInfo"
  >
    <div :class="$style.credit">
      <div :class="$style.top">
        <span :class="$style.amount">{{ amountWithFormat }}</span>
        <span :class="$style.date">{{ startDateWithFormat }}</span>
      </div>
      <div :class="$style.bottom">
        <div :class="$style['credit-info']">
          <span :class="$style.title">Платеж по кредиту</span>
          <span :class="$style.info">{{ nextPayDateWithFormat }}</span>
        </div>
        <div :class="$style.button">
          <base-button
            type="primary"
            @click.stop="handlePay"
            :serialNumber="serialNumber"
          >
            {{ monthlyPaymentWithFormat }}
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moneyFormat from '@/utils/money-formatter';
import { formatDate, diffDatesInDays } from '@/utils/date-utils';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'CreditWidget',
  components: {
    BaseButton,
  },
  props: {
    isVisible: {
      type: Boolean,
    },
    monthlyPayment: {
      type: Number,
      default: 0.00,
    },
    amount: {
      type: Number,
      default: 0.00,
    },
    startDate: {
      type: String,
      default: '1970-12-12',
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
  },
  computed: {
    amountWithFormat() {
      return moneyFormat(this.amount, true);
    },
    monthlyPaymentWithFormat() {
      return moneyFormat(this.monthlyPayment, true);
    },
    startDateWithFormat() {
      return `Кредит от ${formatDate(this.startDate)}`;
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
    padding: 8px 0;
    background-color: $WHITE;
    border-radius: 8px;
    margin: 8px 0;
  }

  .credit {
    .top {
      padding: 16px;
      border-bottom: 1px solid $GALLERY_CREDIT;
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
</style>
