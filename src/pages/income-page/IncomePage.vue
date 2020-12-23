<template>
  <page>
    <template v-slot:header>
      <page-header
        title="Оформление кредита:"
        :titleAmount="titleBalance"
      />
    </template>
    <template v-slot:body>
      <div :class="$style.body">
        <div :class="$style['body-content']">
          <div :class="$style['step-text-block']">
            <span :class="$style['step-title']">
              <b>{{ titleWithStep }}</b><b>Доход</b> и место работы
            </span>
            <span :class="$style['step-sub-title']">
              Напишите ваш ежемесячный доход
              <br />
            </span>
          </div>
          <div :class="$style['input-styles']">
            <money-input
              title="Ежемесячный доход на руки:"
              @onInput="handleIncome"
              :value="incomeWithFormat"
            />
          </div>
          <div :class="$style['radio-styles']">
            <span :class="$style.text">
              Уточните, за последние 6 месяцев, меняли ли вы место работы:
            </span>
            <tab-panel
              :buttons="buttons"
              @click="handleTabClick"
            />
          </div>
          <div :class="$style['checkbox-block']">
            <checkbox
              position="left"
              @input="handleChangeConsent"
              v-model="bkiConsent"
              name="bki-consent"
            >
              <span :class="$style.text">
                Даю согласие банку на запрос информации в бюро
                кредитных историй для оценки моей платежеспособности
              </span>
            </checkbox>
          </div>
        </div>
        <div :class="$style.buttons">
          <base-button
            type="primary"
            @click="calcNextStep"
            :disabled="!isPageValid"
          >
            Продолжить
          </base-button>
          <base-button
            type="transparent"
            @click="handleBack"
            :class="$style['back-button']"
          >
            Вернуться назад
          </base-button>
        </div>
      </div>
    </template>
  </page>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import Page from '@/components/Page';
import Checkbox from '@/components/Checkbox';
import BaseButton from '@/components/BaseButton';
import { getStepRoute } from '@/utils/stepRoute';
import moneyFormat from '@/utils/money-formatter';
import { MoneyInput } from '@/components/inputs';
import TabPanel from '@/modules/tab-panel/TabPanel';
import { TabsChangedJob } from '@/store/types';
import PageHeader from '@/components/PageHeader';

export default {
  name: 'IncomePage',
  components: {
    Page,
    PageHeader,
    BaseButton,
    Checkbox,
    TabPanel,
    MoneyInput,
  },
  data() {
    return {
      buttons: {
        [TabsChangedJob.NO_CHANGED]: {
          text: 'Не менял',
          active: true,
          type: 'primary',
          name: TabsChangedJob.NO_CHANGED,
          isDisabled: false,
        },
        [TabsChangedJob.CHANGED]: {
          text: 'Менял',
          active: false,
          type: 'transparent',
          name: TabsChangedJob.CHANGED,
          isDisabled: false,
        },
      },
    };
  },
  computed: {
    ...mapFields({
      income: 'placeOfWorkAndIncome.income',
      isChangedJob: 'placeOfWorkAndIncome.isChangedJob',
      tabChangedJob: 'placeOfWorkAndIncome.tabChangedJob',
      bkiConsent: 'placeOfWorkAndIncome.bkiConsent',
      amount: 'creditParams.creditAmount',
      currentStep: 'steps.current',
      totalStep: 'steps.total',
      card: 'clientInstance.card',
      clientProfile: 'clientInstance.activated',
      activated: 'tranche.activated',
      authStatus: 'authStatus',
    }),
    titleWithStep() {
      return `Шаг: ${this.currentStep} из 3. `;
    },
    isPageValid() {
      return this.$v.income.required
        && this.$v.income.minLength
        && this.bkiConsent;
    },
    titleBalance() {
      return moneyFormat(this.amount, true);
    },
    incomeWithFormat() {
      const income = this.income || 0;
      return moneyFormat(income);
    },
  },
  beforeMount() {
    if (!this.activated || !this.clientProfile || !this.authStatus) {
      if (!this.authStatus) {
        this.$router.replace('/');
      } else if (!this.activated || !this.clientProfile) {
        this.$router.replace('/main');
      }
    }
  },
  methods: {
    ...mapActions([
      'resetState',
      'setBKIConsent',
      'setStep',
      'fetchCreateLoanRequest',
    ]),
    goBack() {
      const steNumber = this.getCurrentStep - 1;
      this.setStep(steNumber);
      this.$router.replace(getStepRoute(steNumber));
    },
    goToMainPage() {
      this.resetState();
      this.$router.replace('/main');
    },
    handleChangeConsent(value) {
      this.setBKIConsent(value);
    },
    goToSubStep() {
      this.$router.replace('/work-place');
    },
    goNextStep() {
      this.$router.push('/offers');
    },
    calcNextStep() {
      if (this.isChangedJob) {
        this.goToSubStep();
      } else {
        this.$store.commit('upStep');
        this.goNextStep();
      }
    },
    handleTabClick(newActiveIndex) {
      this.buttons[this.tabChangedJob].active = false;
      this.buttons[newActiveIndex].active = true;
      this.$store.commit('SET_CHANGED_JOB', newActiveIndex);
      this.$store.commit('SET_IS_CHANGED_JOB', newActiveIndex === TabsChangedJob.CHANGED);
    },
    handleBack() {
      this.$router.replace('/credit-params');
    },
    handleIncome(value) {
      this.$store.commit('updateIncome', value);
    },
  },
  validations: {
    income: {
      required,
      minLength: minLength(4),
    },
  },
};
</script>

<style lang="scss" module>
  .body {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
    height: calc(100% - 127px);

    .body-content {
      background: $WHITE;
      backdrop-filter: blur(16px);
      border-radius: 8px;
      width: 100%;
      height: 100%;
      padding: 23px 16px 5px;
      box-sizing: border-box;
      margin-bottom: 16px;

      .select {
        padding: 23px 15px 32px;
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

      .buttons {
        width: 100%;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .custom {
          border-radius: 0px 0px 8px 8px;
          margin: 0;
          height: 72px;
        }
      }
    }

    .buttons {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

  }

  .radio-styles {
    .text {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.87);
      display: inline-block;
      text-align: left;
      margin-bottom: 16px;
    }

    &__item {
      text-align: left;
      vertical-align: middle;
      display: flex;
      align-items: center;
    }

    &__input {
      margin: 0;
    }
    &__label {
      margin-left: 11px;
      width: 100%;
    }
  }

  .step-text-block {
    display: flex;
    flex-direction: column;
    padding-top: 3px;
    text-align: left;

    .step-title {
      font-family: Squad;
      font-style: normal;
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

  .input-styles {

    &__half-width {
      width: 50%;
    }
  }

  .radio-styles__input[type='radio'],
  .radio-styles__label {
    cursor: pointer;
  }

  .radio-styles__input[type='radio'] {
    position: relative;
    height: 26px;
    width: 26px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
  }

  .radio-styles__input[type='radio']::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 2px solid #52AE30;
  }

  .radio-styles__input[type='radio']:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #52AE30;
    transform: translate(-50%, -50%);
    visibility: visible;
  }

  .checkbox-block {
    .text {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.0008em;
      color: rgba(0, 0, 0, 0.54);
    }
  }
</style>
