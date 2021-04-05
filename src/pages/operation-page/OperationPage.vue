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
            <!-- <span :class="$style['step-title']">
              <b>{{ titleWithStep }}</b>Доход и <b>место работы</b>
            </span> -->
            <span :class="$style['step-sub-title']">Новый счет</span>
          </div>
          <div :class="$style['work-info']">
            <!-- <div :class="$style['work-info__input-styles']">
              <base-input
                title="Название счёта"
                v-model="name"
              />
            </div> -->
            <div :class="$style['work-info__input-styles']">
              <number-input
                title="Сумма"
                v-model.lazy="amount"
              />
            </div>
            <div :class="$style['work-info__input-styles']">
              <dropdown
                title="Категория"
                :data="categoryList"
                @select="handleCategorySelect"
                :placeholder="categoryTitle"
              >
                <img
                  src="@/assets/icon-arrow-green.svg"
                  alt="arrow"
                />
              </dropdown>
            </div>
            <div :class="$style['work-info__input-styles']" v-if="subCategoryGroup.value">
              <dropdown
                title="Подкатегория"
                :data="subCategoryGroup.data"
                @select="handleSubCategorySelect"
                :placeholder="subTitle"
              >
                <img
                  src="@/assets/icon-arrow-green.svg"
                  alt="arrow"
                />
              </dropdown>
            </div>
            <!-- <div :class="$style['work-info__input-styles']">
              <number-input
                title="Начальное значени"
                v-model.number="amount"
              />
            </div> -->
            <div :class="$style['work-info__input-styles']">
              <dropdown
                title="Тип"
                :data="typeList"
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
              <dropdown
                title="Счет"
                :data="getAccountsList"
                @select="handleAccountSelect"
                :placeholder="account.title"
              >
                <img
                  src="@/assets/icon-arrow-green.svg"
                  alt="arrow"
                />
              </dropdown>
            </div>
          </div>
        </div>
        <!-- <video autoplay style="width: 100%;"></video> -->
        <div :class="$style.buttons">
          <!-- <base-button
            @click="handleCamera"
            type="primary"
          >
            Get access to camera
          </base-button> -->
          <base-button
            type="primary"
            :disabled="!isFormValid"
            @click="handleAddClick"
          >
            Продолжить
          </base-button>
          <base-button
            type="transparent"
          >
            Вернуться назад
          </base-button>
        </div>
      </div>
    </template>
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import QrScanner from 'qr-scanner';
import { mapActions } from 'vuex';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import {
  NumberInput,
  // PhoneInput,
  // SuggestionInput,
  // BaseInput,
} from '@/components/inputs';
import BaseButton from '@/components/BaseButton';
import Dropdown from '@/components/Dropdown';
import {
  LIST_CATEGORY_DEMO,
  OPERATION_TYPES,
  LISTCATEGORY,
} from '@/dictionaries';
import { required, minValue } from 'vuelidate/lib/validators';
// import moneyFormat from '@/utils/money-formatter';

export default {
  name: 'Operation',
  components: {
    Page,
    PageHeader,
    NumberInput,
    // BaseInput,
    BaseButton,
    Dropdown,
  },
  data() {
    return {
      account: {
        uuid: -1,
        title: '',
      },
      amount: 0,
      category: LIST_CATEGORY_DEMO[0],
      categoryTitle: 'Выберите категорию',
      categoryList: LIST_CATEGORY_DEMO,
      color: '#cdbdde',
      currency: {
        uuid: '1',
        title: 'RUB',
      },
      name: '',
      number: '',
      subCategoryGroup: {},
      subCategory: {},
      subCategoryList: LISTCATEGORY,
      subTitle: 'Выберите подкатегорию',
      type: OPERATION_TYPES[1],
      typeList: OPERATION_TYPES,
    };
  },
  props: {
    accountId: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapFields({
      accounts: 'accounts.allAccounts',
    }),
    // isPageValid() {
    //   return this.amount > 0 || this.account.uuid !== -1;
    //   // return false;
    // },
    getAccountsList() {
      console.log('this.accounts', this.accounts);
      return this.accounts.map((item, key) => ({
        ...item,
        uuid: key,
        title: `${item.name} ${item.amount} руб.`,
      }));
    },
    isFormValid() {
      console.log('this.$v.subTitle', this.$v.subTitle);
      console.log('this.$v.account', this.$v.account);
      return this.$v.amount.required
        && this.$v.account.uuid.minValue
        && this.$v.amount.minValue
        && this.$v.subCategory.required;
    },
  },
  mounted() {
    console.log('PROPS', this.accountId);
  },
  methods: {
    ...mapActions([
      'createOperationComposition',
    ]),
    handleCategorySelect(value) {
      this.category = value;
      this.categoryTitle = value.title;
      this.subTitle = 'Выберите подкатегорию';
      this.subCategoryGroup = LISTCATEGORY.find((item) => item.value === value.value) || {};
    },
    handleTypeSelect(value) {
      this.type = value;
    },
    handleAccountSelect(value) {
      console.log('handleAccountSelect_value', value);
      this.account = value;
    },
    handleSubCategorySelect(value) {
      this.subCategory = value;
      this.subTitle = value.title;
      this.$v.subCategory.$touch();
    },
    async handleAddClick() {
      console.log('handleAddClick');
      await this.createOperationComposition({
        account: this.account,
        amount: this.amount,
        category: this.category,
        subCategory: this.subCategory,
        operationType: this.type,
      });
      this.$router.push('/main');
    },
    async handleCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            width: 480,
            height: 320,
            facingMode: { exact: 'environment' },
          },
        });
        const videoTracks = stream.getVideoTracks();
        const track = videoTracks[0];
        const videoElem = document.querySelector('video');
        videoElem.srcObject = stream;
        try {
          const qrScanner = new QrScanner(videoElem, (result) => console.log('decoded qr code:', result));
          // document.querySelector('#get-access').setAttribute('hidden', true);
          console.log('start');
          qrScanner.start();
        } catch (e) {
          console.log('error', e);
        } finally {
          setTimeout(() => {
            // qrScanner.stop();
            // console.log('qrScanner.stop');
            track.stop();
            console.log('track.stop');
          }, 15 * 1000);
        }
      } catch (e) {
        console.log('error', e);
      }
    },
  },
  validations: {
    account: {
      uuid: {
        minValue: minValue(0),
        required,
      },
    },
    amount: {
      minValue: minValue(1),
      required,
    },
    category: {
      required,
    },
    subCategory: {
      required,
    },
  },
};
</script>

<style lang="scss" module>
.tess {
  color: red;
  // height: 70px;
  // height: 200px;
  // transition-property: height;
  // transition-duration: .2s;
  // transition-timing-function: linear;
  // overflow: hidden;
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
