<template>
  <page>
    <template v-slot:header>
      <page-header
        title="Оформление кредита:"
        :titleAmount="titleBalance"
      />
    </template>
    <template v-slot:body>
      <transition name="fade" mode="out-in">
        <div v-if="requestInProgress">
          <card-placeholder />
          <card-placeholder />
        </div>
        <div v-else>
          <page-body-content
            :text="titleWithStep"
            sub-text="Ознакомьтесь с условиями кредита на выбранную вами сумму"
          >
            <details1
              :details="createDetails"
            />
          </page-body-content>
          <page-body-content>
            <payment-schedule
              :first="firstPayment"
              :last="lastPayment"
            />
          </page-body-content>
          <page-body-content
            text="Документы по кредиту"
          >
            <document-link-list
              :documents="documents"
              @click="handleDocumentClick"
            />
            <div :class="$style['email-block']">
              <page-body-content-title
                text="Укажите ваш email мы отправим на него все документы"
              />
              <div :class="$style['email-input']">
                <base-input
                  title="Ваш email"
                  v-model="email"
                  :disabled="requestInProgress"
                >
                </base-input>
              </div>
            </div>
            <div :class="$style['checkbox-block']">
              <checkbox
                position="left"
                @input="onConsent"
                v-model="offerConsent"
                name="credit-sign"
                :disabled="requestInProgress"
              >
                <span>
                  Я ознакомлен с <a
                    href="https://www.otpbank.ru/f/documents/credits/obshie_uslovia_necel.pdf"
                    target="__blank"
                  >условиями</a> предложения
                </span>
              </checkbox>
            </div>
          </page-body-content>
          <div :class="$style['buttons']">
            <base-button
              type="primary"
              :disabled="!isPageValid || requestInProgress"
              @click="handleClick"
            >
              Подписать
            </base-button>
            <base-button
              type="transparent"
              @click="goToMainPage"
              :disabled="requestInProgress"
            >
              Вернуться назад
            </base-button>
          </div>
          <portal to="modals">
            <modal-wrapper
              v-if="isShowSignModal"
              title="Подписать документы"
              @closeModal="handleClose"
            >
              <div :class="$style.sign">
                <span :class="$style.text">
                  {{ smsTextWithNumber }}
                </span>
                <base-input
                  title="Код из СМС"
                  v-model="verificationCode"
                  type="number"
                />
                <resend
                  @click="handleResendClick"
                />
              </div>
            </modal-wrapper>
          </portal>
        </div>
      </transition>
    </template>
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
import get from 'lodash.get';
import dayjs from 'dayjs';
import Page from '@/components/Page';
import DocumentLinkList from '@/components/DocumentLinkList';
import { BaseInput } from '@/components/inputs';
import Checkbox from '@/components/Checkbox';
import BaseButton from '@/components/BaseButton';
import { regex } from '@/utils/regex';
import moneyFormat from '@/utils/money-formatter';
import PageHeader from '@/components/PageHeader';
import PageBodyContent from '@/components/PageBodyContent';
import PageBodyContentTitle from '@/components/PageBodyContentTitle';
import ModalWrapper from '@/components/ModalWrapper';
import Resend from '@/modules/resend-sms/Resend';
import Details1 from '@/components/Details';
import { formatDate } from '@/utils/date-utils';
import { calculateMonthlyPayment } from '@/utils/calculator';
import { getStepRoute } from '../../utils/stepRoute';
import CardPlaceholder from '../virtual-card-page/CardPlaceholder';
import PaymentSchedule from './PaymentSchedule';

export default {
  name: 'CreditInfoSignPage',
  components: {
    Details1,
    Page,
    DocumentLinkList,
    BaseInput,
    Checkbox,
    BaseButton,
    PaymentSchedule,
    PageHeader,
    PageBodyContent,
    PageBodyContentTitle,
    ModalWrapper,
    Resend,
    CardPlaceholder,
  },
  data() {
    return {
      isShowSignModal: false,
      documents: [],
    };
  },
  computed: {
    ...mapFields({
      /**
       * заменить на tranche.creditOffer
       * debugger
       */
      amount: 'tranche.creditOffer.amount',
      term: 'tranche.creditRequest.termMonths',
      payment: 'creditParams.calcMonthlyPayment',
      rate: 'tranche.product.percentYear',
      shedule: 'tranche.agreementOffer.payments',
      currentStep: 'steps.current',
      email: 'credit.email',
      error: 'error.statusType',
      offerConsent: 'credit.offerConsent',
      phone: 'auth.phone',
      totalStep: 'steps.total',
      verificationCode: 'verificationCode',
      authStatus: 'authStatus',
      requestInProgress: 'requestInProgress',
      clientProfile: 'clientInstance.activated',
      activated: 'tranche.activated',
      confirmed: 'tranche.confirmed',
      signed: 'tranche.signed',
    }),
    amountWithFormat() {
      return moneyFormat(this.amount, true);
    },
    monthlyPaymentWithFormat() {
      if (this.confirmed && !this.signed) {
        const date = dayjs();
        const monthlyPay = calculateMonthlyPayment({
          amount: (this.amount * 1),
          rate: this.rate,
          monthCount: this.term,
          extradDate: date.format('DD.MM.YYYY'),
          payDay: date.date(),
        });
        console.log('monthlyPay', monthlyPay);
      }
      return moneyFormat(this.payment, true);
    },
    isPageValid() {
      return this.$v.email.required
        && this.$v.email.minLength
        && this.$v.email.isValidEmail
        && this.offerConsent;
    },
    titleWithStep() {
      return 'Шаг: 3 из 3. Оформление кредита';
    },
    titleBalance() {
      return moneyFormat(this.amount, true);
    },
    smsTextWithNumber() {
      return `Мы отправили смс с проверочным кодом на ваш номер: ${this.phone}`;
    },
    createDetails() {
      return [
        {
          title: 'Сумма кредита',
          value: this.amountWithFormat,
        },
        {
          title: 'Ежемесячный платёж',
          value: this.monthlyPaymentWithFormat,
        },
        {
          title: 'Cрок кредита',
          value: `${this.term} мес`,
        },
        {
          title: 'Ставка',
          value: `${this.rate}%`,
        },
      ];
    },
    firstPayment() {
      return formatDate(get(this.shedule, '[0].date', new Date()));
    },
    lastPayment() {
      if (this.shedule && this.shedule.length) {
        const last = this.shedule[this.shedule.length - 1];
        return formatDate(get(last, 'date', new Date()));
      }
      return formatDate(new Date());
    },
  },
  watch: {
    async verificationCode(value) {
      if (value.length === 4) {
        this.handleClose();
        this.goInfoPage();
        this.$store.dispatch('setRequestInProgress', true);
        await this.checkSignComposition(value);
        this.mockCopyDataToClientLoans();
        this.$store.dispatch('setRequestInProgress', false);
      }
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
  mounted() {
    const { documents } = this.$store.state.tranche;
    if (documents.length) {
      const cDocument = documents.filter((item) => (
        item.title !== 'Заявление на выпуск виртуальной карты'
      ));
      this.documents = cDocument;
    }
  },
  methods: {
    ...mapActions([
      'fetchSignAnything',
      'fetchDocumentsCredit',
      'fetchCreateVCard',
      'resetState',
      'setStep',
      'SignSendSMS',
      'signComposition',
      'checkSignComposition',
      'mockCopyDataToClientLoans',
      'creditSignComposition',
    ]),
    toggleModalStatus() {
      this.openModal = !this.openModal;
    },
    goBack() {
      const stepNumber = this.getCurrentStep - 1;
      this.setStep(stepNumber);
      this.$router.replace(getStepRoute(stepNumber));
    },
    goToMainPage() {
      this.$router.replace('/main');
    },
    async handleClick() {
      // если есть статус confirmed
      await this.creditSignComposition();
      this.isShowSignModal = true;
    },
    handleClose() {
      this.isShowSignModal = false;
    },
    goInfoPage() {
      this.$router.push({
        name: 'Info',
        params: this.prepareErrorParams(),
      });
    },
    onConsent(value) {
      this.$store.commit('SET_CREDIT_CONSENT', value);
    },
    handleResendClick() {},
    handleDocumentClick(uuid) {
      this.$router.push(`/pdf-view/${uuid}`);
    },
    prepareErrorParams() {
      return {
        status: 'success',
      };
    },
  },
  validations: {
    email: {
      required,
      minLength: minLength(6),
      isValidEmail: (email) => regex.email.test(email),
    },
  },
};
</script>

<style lang="scss" module>
  .buttons {
    width: 100%;
    bottom: 0;

    .custom {
      border-radius: 0px 0px 8px 8px;
      margin: 0;
      height: 72px;
    }
  }

  .email-block {
    .email-title {
      font-size: 15px;
      line-height: 18px;
      letter-spacing: -0.0024em;
      color: $BLACK;
      text-align: left;
      width: 100%;
      display: inline-block;
    }
  }

  .checkbox-block {
    margin-bottom: 8px;
  }

  .text {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: $TUNDORA;
    text-align: left;
    display: inline-block;
  }
</style>
