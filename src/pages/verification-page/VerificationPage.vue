<template>
  <page
    :grid-config="pageConfig"
    :isGridPage="true"
  >
    <template v-slot:header>
      <page-auth-header />
    </template>
    <template v-slot:body>
      <div :class="$style.body">
        <span :class="$style['body-title']">
          Подтвердите
          <br />
          номер телефона
        </span>
        <phone-placeholder
          :phone="phone"
          :requestInProgress="requestInProgress"
        />
        <div>
          <div style="display: flex; flex-direction: row;">
            <div>
              <content-loader
                primaryColor="#DEDEDE"
                secondaryColor="#F6F6F6"
              >
                <rect x="0" y="0" width="60%" height="16" />
              </content-loader>
            </div>
          </div>
          <base-input
            v-model="verificationCode"
            title="Код из СМС"
            :disabled="requestInProgress"
            ref="code"
          />
        </div>
        <resend @click="handleRepeatLink" />
        <div :class="$style.buttons">
          <base-button
            type="primary"
            :disabled="!isPageValid"
            @click="sendCode"
          >
            Продолжить
          </base-button>
          <base-button
            type="transparent"
            @click="handleBack"
            :class="$style['back-button']"
            :disabled="requestInProgress"
          >
            Вернуться назад
          </base-button>
        </div>
      </div>
    </template>
  </page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { ContentLoader } from 'vue-content-loader';
import { required, minLength } from 'vuelidate/lib/validators';
import { BaseInput } from '@/components/inputs';
import BaseButton from '@/components/BaseButton';
import Page from '@/components/Page';
import PageAuthHeader from '@/components/PageAuthHeader';
import Resend from '@/modules/resend-sms/Resend';
import { ErrorMessages } from '@/utils/error-messages';
import { TIME_TO_RESEND_SEC } from './constants';
import PhonePlaceholder from './Placeholder';

export default {
  name: 'AuthPage',
  components: {
    BaseButton,
    BaseInput,
    Page,
    PageAuthHeader,
    Resend,
    ContentLoader,
    PhonePlaceholder,
  },
  data() {
    return {
      time: TIME_TO_RESEND_SEC,
      isRepeatLinkDisabled: true,
      pageConfig: {
        rowsCount: 2,
        flexibleRow: 2,
      },
    };
  },
  computed: {
    ...mapGetters([
      'getHasLine',
      'getHasOffer',
      'getHasLoans',
      'getHasCard',
    ]),
    ...mapFields({
      verificationCode: 'verificationCode',
      phone: 'auth.phone',
      requestInProgress: 'requestInProgress',
      hasCard: 'user.hasCard',
      hasCredits: 'user.hasCredits',
      error: 'error.statusType',
      clientInstanceError: 'clientInstance.errors',
      isRestart: 'isRestart',
      authStatus: 'authStatus',
    }),
    isPageValid() {
      return this.$v.verificationCode.required
        && this.$v.verificationCode.minLength
        && !this.requestInProgress;
    },
    repeatMessageText() {
      return `Если вы не получили код, нажмите отправить код повторно по истечении ${this.time} сек.`;
    },
    smsTextWithNumber() {
      return `Мы отправили смс с проверочным кодом на ваш номер: ${this.phone}`;
    },
  },
  watch: {
    isRestart(value) {
      if (value) {
        this.$router.push('/');
      }
    },
    requestInProgress(value) {
      if (!value) {
        this.$refs.code.focus();
      }
    },
  },
  mounted() {
    this.repeatSMS();
  },
  updated() {
    console.log('updated');
  },
  methods: {
    ...mapActions([
      'authProcedure',
      'authProcedureContinue',
      'distionaryCompose',
    ]),
    async sendCode() {
      await this.authProcedureContinue();
      this.$router.push('/main');
    },
    handleBack() {
      this.$store.commit('resetAuthState');
      this.$store.commit('resetVerificationCode');
      this.$router.back();
    },
    repeatSMS() {
      const timerId = setInterval(() => {
        if (this.time < 1) {
          clearInterval(timerId);
          this.isRepeatLinkDisabled = false;
        } else {
          this.time -= 1;
        }
      }, 1000);
    },
    async handleRepeatLink() {
      await this.authProcedure();
    },
    prepareErrorParams() {
      return this.clientInstanceError
        ? {
          errorMessages: ErrorMessages(this.clientInstanceError),
        }
        : {};
    },
  },
  validations: {
    verificationCode: {
      required,
      minLength: minLength(4),
    },
  },
};
</script>

<style lang="scss" module>
  .content-loader {
    background-color: #EAEAEA;
    height: 330px;
    border-radius: 8px;

    .loader1 {
      box-sizing: border-box;
      padding: 16px;
    }
  }
  .body {
    padding: 27px 16px 5px;
    position: relative;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    height: 100%;

    .body-title {
      font-family: Squad;
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 32px;
      color: $BLACK;
      padding-bottom: 10px;
      display: inline-block;
      text-align: left;
      width: 100%;
    }

    .sms-text {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: $TUNDORA;
      display: inline-block;
      padding-bottom: 11px;
      text-align: left;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .back-button {
        font-family: Squad;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        text-align: center;
        color: $APPLE;
      }
    }

    .repeat-text {
      font-family: Squad;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      color: $TUNDORA;
      text-align: left;
      display: inline-block;
    }

    .repeat-link {
      font-family: Squad;
      font-style: normal;
      font-weight: normal;
      line-height: 16px;
      color: $APPLE;
      font-size: 18px;
      padding: 16px 0 20px;
      display: inline-block;

      &.disabled {
        color: $GRAY;
      }
    }
  }
</style>
