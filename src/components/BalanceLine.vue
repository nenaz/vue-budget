<template>
  <div :class="$style['balance-block']">
    <div :class="$style['balance-block__body']">
      <div :class="$style['balance-block__current-credit']">
        <div :class="$style['balance-block__credit-title']">
          <span :class="$style.text">Доступно:</span>
          <span :class="$style.text">Всего:</span>
        </div>
        <div :class="$style['balance-block__credit-amount']">
          <span :class="$style['all-credit-amount']">{{ availableAmountWithFormat }}</span>
          <span :class="$style['base-balance']">{{ baseLimitWithFormat }}</span>
        </div>
        <div :class="$style['balance-block__balance-line']">
          <div :class="$style['balance-block__line-parent']">
            <span
              :class="$style['balance-block__current-credit-line']"
              :style="{ width: styleCurrentCredit }"
            />
            <span
              :class="$style['balance-block__new-credit-line']"
              :style="{ width: styleNewCredit }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moneyFormat from '@/utils/money-formatter';

export default {
  name: 'BalanceLine',
  props: {
    baseLimit: {
      type: Number,
      default: 0,
    },
    allCreditsAmount: {
      type: Number,
      default: 0,
    },
    creditAmount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    styleCurrentCredit() {
      return `${(this.allCreditsAmount / this.baseLimit) * 100}%`;
    },
    baseLimitWithFormat() {
      return moneyFormat(this.baseLimit, true);
    },
    allCreditsAmountWithFormat() {
      return moneyFormat(this.allCreditsAmount);
    },
    availableAmount() {
      return this.baseLimit - this.allCreditsAmount;
    },
    availableAmountWithFormat() {
      return moneyFormat(this.availableAmount, true);
    },
    styleNewCredit() {
      const percentageOfAvailableAmount = (this.allCreditsAmount / this.baseLimit) * 100;
      const currentCreditPercent = (this.creditAmount / this.availableAmount) * 100;
      const availablePercentage = 100 - currentCreditPercent;
      const newCreditWidth = (availablePercentage / 100) * percentageOfAvailableAmount;
      return `${currentCreditPercent + newCreditWidth}%`;
    },
  },
};
</script>

<style lang="scss" module>
$LINE_HEIGHT: 8px;

  .balance-block {
    background-color: $WHITE;

    &__base-limit {
      font-style: normal;
      font-weight: bold;
      font-size: 22px;
      line-height: 26px;
      color: #000000;
      padding: 20px 0 24px;
    }

    &__balance-line {
      padding: 10px 0 0;
    }

    &__line-parent {
      width: 100%;
      height: $LINE_HEIGHT;
      clip-path: inset(0% 0% 0px 0% round $LINE_HEIGHT);
      position: relative;
      background-color: $APPLE;
      box-shadow: 0px 24px 48px rgba(0, 0, 0, 0.08),
      0px -12px 20px rgba(255, 255, 255, 0.9);
    }

    &__current-credit-line {
      display: inline-block;
      height: $LINE_HEIGHT;
      background-color: $BLACK;
      position: relative;
      top: 0;
      left: 0;
      position: absolute;
      z-index: 7;
    }

    &__new-credit-line {
      display: inline-block;
      height: 32px;
      background-color: $TEXAS_ROSE;
      position: relative;
      top: 0;
      left: 0;
      position: absolute;
      z-index: 5;
    }

    &__current-credit {
      padding: 7px 16px 16px;
    }

    &__credit-title {
      display: flex;
      justify-content: space-between;
    }

    &__credit-text {
      font-style: normal;
      font-weight: normal;
      font-size: 9px;
      line-height: 11px;
      color: #7E7E7E;
    }

    &__credit-amount {
      display: flex;
      justify-content: space-between;
    }

    .text {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 10px;
      line-height: 13px;
      color: $DUSTY_GRAY;
    }

    .all-credit-amount {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 21px;
      line-height: 26px;
      color: $FOREST_GREEN;
    }

    .base-balance {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 21px;
      line-height: 26px;
      color: $TUNDORA;
    }
  }
</style>
