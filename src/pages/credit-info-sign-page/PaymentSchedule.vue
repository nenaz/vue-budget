<template>
  <div>
    <div :class="$style['step-text-block']">
      <span :class="$style['step-title']">График платежей</span>
      <span :class="$style['step-sub-title']">
        <!-- Ознакомьтесь с условиями кредита на выбранную вами сумму -->
      </span>
    </div>
    <div :class="$style['sub-block']">
      <div :class="$style['block']">
        <span :class="$style['sub-title']">Первый платеж</span>
        <span :class="$style['sub-line']" />
        <span :class="$style['sub-value']">{{ first }}</span>
      </div>
      <div :class="$style['block']">
        <span :class="$style['sub-title']">Последний платеж</span>
        <span :class="$style['sub-line']"/>
        <span :class="$style['sub-value']">{{ last }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'PaymentSchedule',
  props: {
    first: {
      type: String,
      default: '',
    },
    last: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapFields({
      paymentDay: 'tranche.creditRequest.paymentDay',
    }),
  },
};
</script>

<style lang="scss" module>
  .header {
    background-color: $WHITE;
    box-sizing: border-box;

    .credit-line-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #F6F6F6;
      padding: 12px 31px 8px;

      .title {
        font-weight: bold;
        text-align: center;
        color: $BLACK;
        margin: 15px 0 8px;
        display: inline-block;
        text-align: left;
        width: 100%;
        font-family: Source Sans Pro;
        font-style: normal;
        font-size: 21px;
        line-height: 24px;
      }

      .sub-title {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: $TUNDORA_CALC;
        margin-top: 10px;
        display: inline-block;
        text-align: left;
        width: 100%;
      }

      .credit-amount {
        font-style: normal;
        text-align: center;
        color: $APPLE;
        font-family: Source Sans Pro;
        font-weight: bold;
        font-size: 21px;
        line-height: 26px;
        display: inline-block;
        text-align: left;
        width: 100%;
      }
    }

    .logo-block {
      width: 100%;
      height: 49px;
      display: flex;
      justify-content: center;
      align-items: center;

      .logo {
        width: 101px;
        height: 24px;
        background-image: url('../../assets/logo.svg');
        display: inline-block;
        background-repeat: no-repeat;
      }
    }
  }

  .body-content {
    background: $WHITE;
    backdrop-filter: blur(16px);
    border-radius: 8px;
    width: 100%;
    height: 100%;
    padding: 23px 16px 15px;
    box-sizing: border-box;
    margin-bottom: 16px;
  }

  .virtual-card {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    letter-spacing: -0.15px;
    color: rgba(0, 0, 0, 0.87);
    background: #FFFFFF;
    border-radius: 24px;
    box-sizing: border-box;
  }

  .title {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: rgba(0, 0, 0, 0.87);
    margin: 5px 20%;
  }

  .title-block {
    display: flex;
    flex-direction: column;
  }

  .block {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
  }

  .sub-title {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.24px;
    color: rgba(0, 0, 0, 0.54);

    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    /* or 200% */


    color: rgba(0, 0, 0, 0.87);
  }

  .sub-line {
    border-bottom: 1px dashed #E2E2E2;
    margin: 0 2px;
  }

  .sub-value {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    text-align: right;
    color: rgba(0, 0, 0, 0.87);

    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 32px;
    /* or 200% */

    text-align: right;

    color: rgba(0, 0, 0, 0.87);
  }

  .step-text-block {
    display: flex;
    flex-direction: column;
    padding-top: 3px;
    text-align: left;

    .step-title {
      font-family: Squad;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      color: $BLACK;
    }

    .step-sub-title {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #494949;
      margin-bottom: 15px;
    }
  }
</style>
