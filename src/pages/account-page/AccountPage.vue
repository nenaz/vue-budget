<template>
  <page>
    <template v-slot:header>
      <page-header
        :showMenu="true"
        :showBack="true"
      />
    </template>
    <template v-slot:body>
      <div :class="$style.body">
        <div :class="$style['body-content tess']">
          <div :class="$style['step-text-block']">
            <span :class="$style['step-sub-title']">{{ title }}</span>
          </div>
          <div v-if="!invest">
            <div :class="$style['work-info']">
              <div :class="$style['work-info__input-styles']">
                <base-input
                  title="Название счёта"
                  v-model="name"
                />
              </div>
              <div :class="$style['work-info__input-styles']">
                <number-input
                  title="Номер счета"
                  v-model.lazy="number"
                />
              </div>
              <div :class="$style['work-info__input-styles']">
                <dropdown
                  title="Тип"
                  :data="accountTypes"
                  @select="handleTypeSelect"
                  :placeholder="type.title"
                >
                  <img
                    src="@/assets/icon-arrow-green.svg"
                    alt="arrow"
                  />
                </dropdown>
              </div>
              <div :class="$style['work-info__input-styles']">
                <number-input
                  title="Начальное значени"
                  v-model.number="amount"
                />
              </div>
              <div :class="$style['work-info__input-styles']">
                <dropdown
                  title="Валюта"
                  :data="currencyList"
                  @select="handleCurrencySelect"
                  :placeholder="currency.title"
                >
                  <img
                    src="@/assets/icon-arrow-green.svg"
                    alt="arrow"
                  />
                </dropdown>
              </div>
            </div>
          </div>
          <div v-else>
            <div :class="$style['work-info__input-styles']">
              <number-input
                title="Новое значени"
                v-model.number="amount"
              />
              <!-- <el-input-number
                v-model="amount"
                :min="1"
                :max="10"
              ></el-input-number> -->
            </div>
          </div>
        </div>
        <div :class="$style.buttons">
          <!-- <base-button
            type="primary"
            @click="goNextStep"
            :disabled="!isPageValid"
          >
            Продолжить
          </base-button> -->
          <el-button
            type="primary"
            :loading="requestInProgress"
            @click="goNextStep"
            :class="$style.test"
          >Продолжить</el-button>
        </div>
      </div>
    </template>
  </page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { required, minLength, between } from 'vuelidate/lib/validators';
import get from 'lodash.get';
import Page from '@/components/Page';
import {
  NumberInput,
  // PhoneInput,
  // SuggestionInput,
  BaseInput,
} from '@/components/inputs';
// import BaseButton from '@/components/BaseButton';
import Dropdown from '@/components/Dropdown';
import moneyFormat from '@/utils/money-formatter';
import PageHeader from '@/components/PageHeader';
import { AccountTypes, CurrencyList } from '@/dictionaries';
import { ErrorMessages } from '@/utils/error-messages';
// import {
//   InputPlaceholder,
// } from '@/components/placeholders';

export default {
  name: 'AccountPage',
  components: {
    // BaseButton,
    Dropdown,
    BaseInput,
    NumberInput,
    Page,
    PageHeader,
    // PhoneInput,
    // SuggestionInput,
    // InputPlaceholder,
  },
  data() {
    return {
      name: '',
      number: '',
      type: {
        uuid: '0',
        title: '',
      },
      amount: 0,
      currency: {
        uuid: '1',
        title: 'RUB',
      },
      color: '#cdbdde',
      accountTypes: AccountTypes,
      currencyList: CurrencyList,
      title: '',
    };
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    edit: {
      type: String,
      default: '',
    },
    invest: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapFields({
      // address: 'placeOfWorkAndIncome.address',
      // organization: 'placeOfWorkAndIncome.organization',
      // specialization: 'placeOfWorkAndIncome.specialization',
      // experience: 'placeOfWorkAndIncome.experience',
      // sector: 'placeOfWorkAndIncome.sector',
      // ownership: 'placeOfWorkAndIncome.ownership',
      // phone: 'placeOfWorkAndIncome.phone',
      // position: 'placeOfWorkAndIncome.position',
      // amount: 'creditParams.creditAmount',
      // currentStep: 'steps.current',
      // totalStep: 'steps.total',
      // error: 'error.statusType',
      requestInProgress: 'requestInProgress',
      // clientProfile: 'clientInstance.activated',
      // activated: 'tranche.activated',
      // authStatus: 'authStatus',
    }),
    ...mapGetters([
      'getHasCard',
      'getAccountById',
    ]),
    titleWithStep() {
      return `Шаг: ${this.currentStep} из 3. `;
    },
    isPageValid() {
      return this.name !== ''
        && this.number !== ''
        // && this.$v.type.between
        && this.type.title !== ''
        && this.amount !== 0;
      // && this.$v.sector.required
      // && this.$v.ownership.required
      // && this.$v.phone.required
      // && this.$v.phone.minLength
      // && this.$v.position.required;
    },
    titleBalance() {
      return moneyFormat(this.amount, true);
    },
    dictionaries() {
      return this.$store.state.dictionaries;
    },
    // currentAccount() {
    //   console.log('this.getAccountById(this.id)', this.getAccountById(this.id));
    //   return this.getAccountById(this.id);
    // },
    // getName() {
    //   return this.currentAccount?.name;
    // },
  },
  async beforeMount() {
    // if (this.activated && this.clientProfile && this.authStatus) {
    //   this.$store.dispatch('setRequestInProgress', true);
    //   await this.distionaryCompose();
    //   if (this.error === 'error') {
    //     this.$router.push('/info');
    //   }
    //   this.$store.dispatch('setRequestInProgress', false);
    // } else if (!this.activated || !this.clientProfile) {
    //   this.$router.replace('/main');
    // } else {
    //   this.$router.replace('/');
    // }
    if (this.edit === 'edit') {
      this.updateData();
    }
  },
  mounted() {
    // console.log('this.$route.params.pathMatch', this.$route.params.pathMatch);
    console.log('this.invest', this.invest);
  },
  methods: {
    ...mapActions([
      'setStep',
      'compositionCreateRequest',
      'distionaryCompose',
      'createAccount',
      'fetchUpdateAccount',
    ]),
    updateData() {
      // console.log('this.getAccountById(this.id)', this.getAccountById(this.id));
      // console.log('pathMatch', this.$route.params.pathMatch);
      const currentAccount = this.getAccountById(this.id);
      this.name = currentAccount?.name;
      this.number = currentAccount?.number;
      this.type = currentAccount?.type;
      this.amount = currentAccount?.amount;
      // this.number = currentAccount?.number;
    },
    goBack() {
      this.$router.replace('/income');
    },
    async goNextStep() {
      const params = {
        name: this.name,
        number: this.number,
        type: this.type,
        id: this.id,
        currency: this.currency,
        amount: this.amount,
        isEditAccount: !!this.edit,
      };
      if (this.edit === 'edit') {
        if (this.invest) {
          params.isInvest = this.invest;
        }
        await this.fetchUpdateAccount(params);
      } else {
        await this.createAccount(params);
      }
      this.$router.push('/main');
      // console.log('this', this.name);
      // console.log('this', this.type);
    },
    handleTypeSelect(value) {
      this.type = value;
    },
    handleCurrencySelect(value) {
      this.currency = value;
    },
    handlePositionSelect(value) {
      this.$store.commit('updatePosition', value);
    },
    handleSpecializationSelect(value) {
      this.$store.commit('updateSpecialization', value);
    },
    handleSelectAddress(suggestion) {
      this.address = suggestion.value;
    },
    handleSelectOrganization(suggestion) {
      this.organization = get(suggestion, 'value', '');
      this.address = get(suggestion, 'data.address.value', this.address);
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
    address: {
      required,
    },
    organization: {
      required,
    },
    specialization: {
      required,
    },
    experience: {
      required,
      between: between(1, 500),
    },
    sector: {
      required,
    },
    ownership: {
      required,
    },
    phone: {
      required,
      minLength: minLength(11),
    },
    position: {
      required,
    },
  },
};
</script>

<style lang="scss" module>
  .test {
    width: 100%;
  }
  .body {
    position: relative;

    .body-content {
      background: $WHITE;
      // backdrop-filter: blur(16px);
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

        .custom {
          border-radius: 0px 0px 8px 8px;
          margin: 0;
          height: 72px;
        }
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

  .work-info {
    margin-bottom: 47px;
  }

  .input-placeholder {
    margin-bottom: 24px;
  }

  .dictionary-item-block {
    height: 86px;
  }

  .dictionary-item-text {
    z-index: 99999;
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #808080;
    top: -19px;
    font-size: 12px;
    line-height: 20px;
    display: inline-block;
    text-align: left;
    width: 100%;
  }
</style>
