<template>
  <page>
    <template v-slot:header>
      <div :class="$style.header">
        <page-header />
        <transition name="fade" mode="out-in">
          <header-placeholder v-if="requestInProgress" />
          <!-- <div
            :class="$style['credit-line-text']"
            v-else-if="!getHasLoans"
          >
            <span :class="$style['title']">
              Одобренная
              <br />
              кредитная линия:
            </span>
            <span :class="$style['credit-amount']">{{ baseLimitWithFormat }}</span>
            <span :class="$style['sub-title']">Рассчитайте и возьмите нужную
              сумму для покупок. Всего % шага и деньги у вас на виртуальной карте.
            </span>
          </div> -->
          <balance-line
            v-else
            :baseLimit="baseLimit"
            :creditAmount="creditAmount"
            :allCreditsAmount="sumAllLoans"
          />
        </transition>
      </div>
    </template>
    <template v-slot:body>
      <div :class="$style.body">
        <div :class="$style['body-content']">
          <div>
            <div :class="$style.select">
              <span :class="$style.title">Расчет суммы кредита</span>
              <tab-panel
                :buttons="buttons"
                @click="handleTabClick"
              />
              <div>
                <money-input
                  title="Сумма кредита"
                  @onInput="handleCreditAmount"
                  :value="amountWithFormat"
                  :disabled="requestInProgress"
                />
                <range-slider
                  @onInput="handleCreditAmount"
                  :currentValue="creditAmount"
                  :class="$style.slider"
                  :minValue="minRangeValue"
                  :maxValue="getMaxRangeValue"
                  :disabled="requestInProgress"
                />
                <div v-if="isAmountTabActive">
                  <transition name="fade" mode="out-in">
                    <input-placeholder v-if="requestInProgress"
                      :class="$style['input-placeholder']"
                    />
                    <dropdown
                      v-else
                      :data="getTerms"
                      title="Срок кредита"
                      :placeholder="String(term)"
                      postFix="мес"
                      @select="handleDropdownClick"
                      :disabled="requestInProgress"
                    >
                      <img
                        src="@/assets/icon-arrow-green.svg"
                        alt="arrow"
                      />
                    </dropdown>
                  </transition>
                </div>
                <div v-else>
                  <money-input
                    title="Ежемесячный платеж:"
                    :value="monthlyPaymentWithFormat"
                    disabled
                  />
                  <range-slider
                    @onInput="handleMonthlyPayment"
                    :currentValue="manualMonthlyPayment"
                    :maxValue="monthlyPayParams.max"
                    :minValue="monthlyPayParams.min"
                    :step="monthlyPayParams.step"
                    :class="$style.slider"
                    :disabled="requestInProgress"
                  />
                </div>
              </div>
            </div>
          </div>
          <div :class="$style['buttons-block']">
            <line-placeholder :class="linePlacehoderClasses" />
            <credit-info
              :monthlyPay="monthlyPay"
              :term="calcCreditTerm.term"
              :calcOverpayment="calcOverpayment"
              :is-amount-tab-active="isAmountTabActive"
              :percent="getPercent"
            />
          </div>
          <div :class="$style.buttons">
            <base-button
              type="calc-button"
              @click="goNext"
              :disabled="!isPageValid"
            >
              Взять сумму
            </base-button>
          </div>
        </div>
        <base-button
          type="transparent"
          @click="handleBack"
          :class="$style['back-button']"
        >
          Вернуться назад
        </base-button>
      </div>
    </template>
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import isNaN from 'lodash.isnan';
import dayjs from 'dayjs';
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/BaseButton';
import RangeSlider from '@/components/RangeSlider';
import { MoneyInput } from '@/components/inputs';
import TabPanel from '@/modules/tab-panel/TabPanel';
import Dropdown from '@/components/Dropdown';
import Page from '@/components/Page';
import moneyFormat from '@/utils/money-formatter';
import {
  calculateMonthlyPayment,
  calculateTerm,
  overpayment,
} from '@/utils/calculator';
import { termGeneration } from '@/utils/term-generation';
import { TabValues } from '@/store/types';
import BalanceLine from '@/components/BalanceLine';
import PageHeader from '@/components/PageHeader';
import { sumOfAllLoans } from '@/utils/sum-all-loans';
import {
  HeaderPlaceholder,
  InputPlaceholder,
  LinePlaceholder,
} from '@/components/placeholders';
import CreditInfo from './CreditInfo';
import { CURRENT_RATE, MIN_MONTHLY_PAYMENT } from './constants';

export default {
  name: 'CreditParamsPage',
  components: {
    BaseButton,
    RangeSlider,
    MoneyInput,
    TabPanel,
    Dropdown,
    Page,
    CreditInfo,
    BalanceLine,
    PageHeader,
    HeaderPlaceholder,
    InputPlaceholder,
    LinePlaceholder,
  },
  data: () => ({
    postfix: 'мес',
    buttons: {
      [TabValues.AMOUNT]: {
        text: 'Хочу сумму',
        active: true,
        type: 'primary',
        name: TabValues.AMOUNT,
      },
      [TabValues.MONTH_PAY]: {
        text: 'Хочу платёж',
        active: false,
        type: 'transparent',
        name: TabValues.MONTH_PAY,
      },
    },
    monthlyPayParams: {
      min: MIN_MONTHLY_PAYMENT,
      max: 15000,
      step: 500,
    },
  }),
  computed: {
    ...mapFields({
      activeTab: 'creditParams.activeTab',
      term: 'creditParams.term',
      creditAmount: 'creditParams.creditAmount',
      manualMonthlyPayment: 'creditParams.manualMonthlyPayment',
      baseLimit: 'clientInstance.line.limit',
      hasCredits: 'user.hasCredits',
      hasCard: 'user.hasCard',
      loans: 'clientInstance.loans',
      clientProfile: 'clientInstance.activated',
      minRangeValue: 'tranche.product.amount.min',
      maxRangeValue: 'tranche.product.amount.max',
      percent: 'tranche.product.percentYear',
      error: 'error.statusType',
      minTerm: 'tranche.product.termMonths.min',
      maxTerm: 'tranche.product.termMonths.max',
      step: 'tranche.product.termMonths.maxDeferred',
      requestInProgress: 'requestInProgress',
      isRestart: 'isRestart',
      activated: 'tranche.activated',
      authStatus: 'authStatus',
    }),
    ...mapGetters([
      'getHasCard',
      'getHasLoans',
    ]),
    getPercent() {
      return `${this.percent}%`;
    },
    getMaxRangeValue() {
      const availableAmount = this.baseLimit - this.sumAllLoans;
      return availableAmount < this.maxRangeValue
        ? availableAmount
        : this.maxRangeValue;
    },
    amountWithFormat() {
      return moneyFormat(this.creditAmount);
    },
    baseLimitWithFormat() {
      return moneyFormat(this.baseLimit);
    },
    monthlyPay() {
      let result = '0.00';
      if (this.activeTab === TabValues.AMOUNT) {
        const amount = this.creditAmount;
        const date = dayjs();
        result = calculateMonthlyPayment({
          amount: (amount * 1),
          rate: 6.9,
          monthCount: this.term,
          extradDate: date.format('DD.MM.YYYY'),
          payDay: date.date(),
        });
        this.$store.commit('SET_MONTH_PAY', result);
      }
      return isNaN(result)
        ? '0.00'
        : result;
    },
    isAmountTabActive() {
      return this.activeTab === TabValues.AMOUNT;
    },
    monthlyPaymentWithFormat() {
      return moneyFormat(this.manualMonthlyPayment);
    },
    calcCreditTerm() {
      if (this.manualMonthlyPayment < MIN_MONTHLY_PAYMENT) {
        return {
          term: 'Срок слишком мал',
          monthlyPayment: 0.00,
        };
      }
      const result = this.activeTab === TabValues.MONTH_PAY
        ? calculateTerm(this.creditAmount, CURRENT_RATE, this.manualMonthlyPayment)
        : {
          term: this.term,
          monthlyPayment: this.monthlyPay,
          activeTab: this.activeTab,
        };
      return result;
    },
    calcOverpayment() {
      if (this.activeTab === TabValues.AMOUNT) {
        const overpaymentValue = moneyFormat(
          overpayment(this.creditAmount, CURRENT_RATE, this.term),
          true,
        );
        this.$store.commit('SET_CREDIT_OVERPAYMENT', overpaymentValue);
        return overpaymentValue;
      }
      const overpaymentValue = moneyFormat(
        overpayment(this.creditAmount, CURRENT_RATE, this.calcCreditTerm.term),
        true,
      );
      this.$store.commit('SET_CREDIT_OVERPAYMENT', overpaymentValue);
      return overpaymentValue;
    },
    isPageValid() {
      return this.creditAmount > 0;
    },
    getTerms() {
      return termGeneration(this.minTerm, this.maxTerm, this.step);
    },
    sumAllLoans() {
      return sumOfAllLoans(this.loans);
    },
    linePlacehoderClasses() {
      return {
        [this.$style.placeholder]: true,
        [this.$style.disabled]: !this.requestInProgress,
      };
    },
  },
  async beforeMount() {
    this.resetStateTranche();
    this.$store.dispatch('setError', {});
    if (!this.activated && this.clientProfile && this.authStatus) {
      this.$store.dispatch('setRequestInProgress', true);
      await this.createAndReceiveTranshCreationStatus();
      this.$store.dispatch('setRequestInProgress', false);
    } else {
      this.$router.replace({
        name: 'Info',
        params: {
          statusType: 'error',
        },
      });
    }
  },
  methods: {
    ...mapActions([
      'getClientInstance',
      'fetchCurrentTranche',
      'createAndReceiveTranshCreationStatus',
      'resetStateTranche',
    ]),
    handleTabClick(newActiveIndex) {
      this.buttons[this.activeTab].active = false;
      this.buttons[newActiveIndex].active = true;
      this.$store.commit('SET_ACTIVE_TAB', newActiveIndex);
    },
    handleDropdownClick(value) {
      this.$store.commit('updateCreditTerm', value);
    },
    handleCreditAmount(value) {
      this.$store.commit('UPDATE_CREDIT_AMOUNT', value);
    },
    handleMonthlyPayment(value) {
      this.$store.commit('UPDATE_MANUAL_MONTHLY_PAYMENT', value);
    },
    async goNext() {
      this.$store.commit('UPDATE_MONTHLY_PAYMENT', this.manualMonthlyPayment);
      this.calcTotalStep();
      this.$router.push('/income');
    },
    calcTotalStep() {
      if (this.getHasCard) {
        this.$store.commit('updateTotalStep', this.totalStep - 1);
      }
    },
    handleBack() {
      this.$router.replace('/main');
    },
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
      background-color: $WILD_SAND;
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

  .body {
    position: relative;

    .body-content {
      background: $WHITE;
      // backdrop-filter: blur(16px);
      border-radius: 8px;
      width: 100%;
      height: 100%;

      .select {
        padding: 23px 15px 0px;
        box-sizing: border-box;

        .title {
          font-family: Squad;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 24px;
          text-align: center;
          color: $BLACK;
          display: inline-block;
          width: 100%;
          height: 24px;
          padding-bottom: 17px;
        }

        .slider {
          margin: 0px auto 35px;
        }
      }

      .buttons-block {
        position: relative;
      }

      .buttons {
        width: 100%;
        bottom: 0;

        .custom {
          border-radius: 0px 0px 8px 8px;
          margin: 0;
          height: 72px;
        }
      }
    }
  }

  .footer {
    border-top: 1px solid $GALLERY;
    padding: 12px 16px;

    .bank-license {
      display: flex;
      flex-direction: column;
      justify-content: left;

      .phone {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        text-align: left;
        color: $APPLE;
      }

      .license-name {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: $BOULDER;
        text-align: left;
        margin-top: 9px;
      }
    }
  }

  .input-placeholder {
    margin-bottom: 24px;
  }

  .placeholder {
    position: absolute;
    top: 18px;
    left: 37%;
    height: 40px;
  }
  .disabled {
    display: none;
  }
</style>
