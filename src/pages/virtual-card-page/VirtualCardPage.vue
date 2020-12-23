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
        <transition name="fade" mode="out-in">
          <div v-if="requestInProgress">
            <card-title-placeholder />
            <card-placeholder />
          </div>
          <div v-else>
            <div :class="$style['body-content']">
              <div :class="$style['step-text-block']">
                <div :class="$style['title-block']">
                  <span :class="$style['step-title']">
                    {{ titleWithStep }}
                  </span>
                  <help-icon
                    title="Что такое карта для покупок?"
                  >
                    Карта для покупок - это виртуальная карта которая открывается специально
                     для вас при первичном взятии кредита.
                    <br />
                    На карту поступаю взятые вами деньги, тратить которые вы можете
                     используя реквизиты карты или подключив ее к телефону с возможность
                     бесконтактных платежей.
                  </help-icon>
                </div>
                <span :class="$style['step-sub-title']">
                  Открытие цифровой карты, на нее поступят деньги
                </span>
              </div>
              <card :term="term" />
            </div>
            <div :class="$style['body-content']">
              <div>
                <div :class="$style['step-text-block']">
                  <span :class="$style['step-title']">Документы по карте</span>
                </div>
                <document-link-list
                  :documents="documents"
                  @click="handleDocumentClick"
                />
              </div>
              <div :class="$style['checkbox-block']">
                <checkbox
                  position="left"
                  @input="onConsent"
                  v-model="vcardConsent"
                  name="vcard-consent"
                >
                  <span>
                    Я ознакомлен с
                      <a
                      href="https://www.otpbank.ru/f/documents/cards/obs-0120.pdf"
                      target="__blank"
                    >тарифами</a> и
                      <a
                      href="https://www.otpbank.ru/f/documents/cards/obs-0120.pdf"
                      target="__blank"
                    >правилами</a>
                  </span>
                </checkbox>
              </div>
            </div>
            <div :class="$style.buttons">
              <base-button
                type="primary"
                @click="goNextStep"
                :disabled="!isPageValid"
              >
                Продолжить
              </base-button>
              <base-button
                type="transparent"
                :handleClick="goToMainPage"
                @click="goToMainPage"
              >
                Вернуться назад
              </base-button>
            </div>
          </div>
        </transition>
      </div>
    </template>
  </page>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import get from 'lodash.get';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import DocumentLinkList from '@/components/DocumentLinkList.vue';
import Checkbox from '@/components/Checkbox.vue';
import BaseButton from '@/components/BaseButton';
import moneyFormat from '@/utils/money-formatter';
import { getStepRoute } from '@/utils/stepRoute';
import { HelpIcon } from '@/modules/help-icon';
import CardPlaceholder from './CardPlaceholder';
import CardTitlePlaceholder from './CardTItlePlaceholder';
import Card from './Card.vue';

export default {
  name: 'VirtuaCardPage',
  components: {
    Page,
    Card,
    DocumentLinkList,
    PageHeader,
    Checkbox,
    BaseButton,
    CardPlaceholder,
    CardTitlePlaceholder,
    HelpIcon,
  },
  data() {
    return {
      documents: [],
    };
  },
  computed: {
    ...mapFields({
      email: 'credit.email',
      vcardConsent: 'credit.vcardConsent',
      verificationCode: 'verificationCode',
      term: 'creditParams.term',
      creditOffer: 'tranche.creditOffer',
      currentStep: 'steps.current',
      totalStep: 'steps.total',
      isRestart: 'isRestart',
      authStatus: 'authStatus',
      requestInProgress: 'requestInProgress',
      error: 'error.statusType',
    }),
    titleWithStep() {
      return 'Шаг: 2 из 3. Карта для покупок';
    },
    titleBalance() {
      const sum = get(this.creditOffer, 'amount', 0);
      return moneyFormat(sum, true);
    },
    isPageValid() {
      return this.vcardConsent;
    },
  },
  watch: {
    error(value) {
      if (value === 'error') {
        this.$router.push({
          name: 'Info',
        });
      }
    },
  },
  mounted() {
    const { documents } = this.$store.state.tranche;
    if (documents && documents.length) {
      const vcDocument = documents.find((item) => (
        item.title === 'Заявление на выпуск виртуальной карты'
      ));
      this.documents = [vcDocument];
    }
  },
  methods: {
    ...mapActions([
      'fetchSignAnything',
      'resetState',
      'setStep',
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
    goNextStep() {
      this.$store.commit('upStep');
      this.$router.push('/credit-sign');
    },
    onConsent(value) {
      this.$store.commit('SET_VCARD_CONSENT', value);
    },
    handleDocumentClick(uuid) {
      this.$router.push(`/pdf-view/${uuid}`);
    },
  },
  validations: {
    vcardConsent: {
      required,
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
  }

  .body-content {
    background: $WHITE;
    backdrop-filter: blur(16px);
    border-radius: 8px;
    width: 100%;
    padding: 23px 16px 15px;
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

      .custom {
        border-radius: 0px 0px 8px 8px;
        margin: 0;
        height: 72px;
      }
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

  .email-block {
    .email-title {
      font-size: 15px;
      line-height: 18px;
      letter-spacing: -0.0024em;
      color: #000000;
      text-align: left;
      width: 100%;
      display: inline-block;
    }

    .email-input {
      margin: 15px 0;
    }
  }

  .checkbox {
    margin: 25px 0;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .title-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
