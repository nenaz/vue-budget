<template>
  <div class="credit-info">
    <div class="info">
      <div class="rate">
        <span class="sub-title">Ставка</span>
        <span class="dashed"></span>
        <span class="sub-value">6,9%</span>
      </div>
      <div class="monthly-pay">
        <span class="sub-title">Ежемесячный платеж</span>
        <span class="dashed"></span>
        <span v-if="params.activeTab === '0'" class="sub-value">{{ monthlyPay }}</span>
        <span v-else class="sub-value">{{ params.monthlyPayment }}</span>
      </div>
      <div class="monthly-pay">
        <span class="sub-title">Срок</span>
        <span class="dashed"></span>
        <span class="sub-value">{{ params.term }}</span>
      </div>
      <div class="hr"></div>
      <div v-if="currentCredit" class="other-credits">
        <span>Платежи по другим кредитам</span>
      </div>
      <div v-if="currentCredit" class="other-pay">
        <span class="sub-title">Другие платежи</span>
        <span class="dashed"></span>
        <span class="sub-value">{{ getCurrentCredit }}</span>
      </div>
      <div class="hr" v-if="currentCredit"></div>
      <div v-if="params.activeTab === '0'" class="all-monthly-pay">
        <span class="monthly-sub-title">Ежемесячный платеж c учетом других платежей:</span>
        <span class="monthly-value">{{ monthlyPay }} ₽</span>
      </div>
      <div v-else class="all-monthly-pay">
        <span class="monthly-sub-title">Срок кредита составит:</span>
        <span class="monthly-value">{{ params.term }} мес</span>
      </div>
    </div>
  </div>
</template>

<script>
import moneyFormat from '@/utils/money-formatter';

export default {
  name: 'CreditInfo',
  props: {
    currentCredit: {
      type: Number,
    },
    monthlyPay: {
      type: String,
    },
    params: {
      term: Number,
      monthlyPayment: Number,
      activeTab: String,
    },
  },
  computed: {
    getCurrentCredit() {
      return moneyFormat(this.currentCredit, true);
    },
  },
};
</script>

<style scoped lang="scss">
  .credit-info {
    margin: 24px auto;

    .hr {
      // display: inline-block;
      width: 100%;
      height: 1px;
      background: #EBEBEB;
      margin: 20px 0
    }

    .all-monthly-pay {
      display: flex;
      flex-direction: column;
      align-items: center;

      .monthly-sub-title {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        letter-spacing: -0.24px;
        color: rgba(0, 0, 0, 0.54);
        margin: 0 48px 7px;
      }

      .monthly-value {
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        text-align: right;
        letter-spacing: -0.15px;
        color: rgba(0, 0, 0, 0.87);
      }
    }

    .other-credits {
      .sub-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .custom-checkbox {
        position: absolute;
        z-index: -1;
        opacity: 0;
      }

      .custom-checkbox+.sub-title {
        display: inline-flex;
        align-items: center;
        user-select: none;
      }

      .custom-checkbox+.sub-title::after {
        content: '';
        display: inline-block;
        width: 24px;
        height: 24px;
        // width: 1em;
        // height: 1em;
        flex-shrink: 0;
        flex-grow: 0;
        border: 1px solid #adb5bd;
        border-radius: 0.25em;
        // margin-right: 0.5em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
        border-radius: 8px;
        outline: none;
      }

      .custom-checkbox:checked+.sub-title::after {
        border-color: #52AE30;
        background-color: #52AE30;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
      }

      .custom-checkbox:disabled+.sub-title::before {
        background-color: #e9ecef;
      }
    }

    .rate, .monthly-pay, .other-pay, .other-credits {
      display: flex;
      flex-direction: row;
      margin: 7px 0;

      .sub-title {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -0.24px;
        color: rgba(0, 0, 0, 0.54);
      }

      .dashed {
        border-bottom: 1px dashed #E3E3E3;
        flex-grow: 1;
      }

      .sub-value {
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        letter-spacing: -0.15px;
        color: rgba(0, 0, 0, 0.87);
      }
    }
  }
</style>
