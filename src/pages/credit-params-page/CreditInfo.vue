<template>
  <div :class="$style['credit-params']">
    <div :class="$style['first-row']">
      <div :class="$style.left">
        <span :class="$style.title">Переплата:</span>
        <span :class="$style.text">{{ calcOverpayment }}</span>
      </div>
      <div :class="$style.right">
        <span :class="$style.title">Ставка</span>
        <span :class="$style.text">{{ percent }}</span>
      </div>
    </div>
    <div :class="$style['second-row']">
      <div v-if="isAmountTabActive" :class="$style.left">
        <span :class="$style.title">Ежемесячный платеж:</span>
        <span :class="$style.text">{{ monthlyPay }}</span>
      </div>
      <div v-else :class="$style.left">
        <span :class="$style.title">Срок кредита:</span>
        <span :class="$style.text">{{ term }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreditInfo',
  props: {
    monthlyPay: {
      type: String,
      default: '0.00',
    },
    term: {
      type: [Number, String],
    },
    isAmountTabActive: {
      type: Boolean,
      default: true,
    },
    calcOverpayment: {
      type: String,
    },
    percent: {
      type: String,
      default: '0.0%',
    },
  },
};
</script>

<style lang="scss" module>
  .credit-params {
    border-top: 1px solid $WILD_SAND;
    padding-bottom: 10px;

    .first-row {
      display: grid;
      grid-template-columns: 50% 50%;

      .left {
        border-right: 1px solid $WILD_SAND;
      }

      .left, .right {
        display: flex;
        flex-direction: column;
        padding: 10px 12px 10px 16px;
        text-align: left;

        .title {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: normal;
          font-size: 10px;
          line-height: 13px;
          color: $GRAY;
        }

        .text {
          font-family: Squad;
          font-style: normal;
          font-weight: 800;
          font-size: 24px;
          line-height: 32px;
          color: $GRAY;
        }
      }
    }

    .second-row {
      display: grid;
      grid-template-columns: 100%;
      border-top: 1px solid #F6F6F6;

      .left {
        display: flex;
        flex-direction: column;
        padding: 10px 12px 10px 16px;

        .title {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: normal;
          font-size: 10px;
          line-height: 13px;
          color: #858585;
          text-align: left;
        }

        .text {
          font-family: Squad;
          font-style: normal;
          font-weight: 800;
          font-size: 24px;
          line-height: 32px;
          color: #494949;
        }
      }
    }
  }
</style>
