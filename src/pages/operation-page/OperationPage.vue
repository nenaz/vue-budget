<template>
  <page>
    <template v-slot:header>
      <page-header
        :showMenu="true"
        :showBack="true"
        title="Новая операция"
      />
    </template>
    <template v-slot:body>
      <div :class="$style.body">
        <div :class="$style['top-content-block']">
          <div :class="$style['body-content tess']">
            <div :class="$style['work-info']">
              <div :class="$style['work-info__input-styles']">
                <number-input
                  title="Сумма"
                  v-model.lazy="amount"
                />
              </div>
              <div :class="$style.select">
                <date-picker
                  v-model="operDate"
                  valueType="format"
                  :editable = "false"
                  :clearable = "false"
                  style="width: 100%"
                  format="DD.MM.YYYY"
                >
                </date-picker>
              </div>
              <div :class="$style.select">
                <el-select
                  v-model="category"
                  placeholder="Категория"
                  :class="$style.button"
                  @change="handleCategorySelect"
                >
                  <el-option
                    v-for="item in dictionaries.category"
                    :key="item._id"
                    :label="item.categoryName"
                    :value="item.categoryName">
                  </el-option>
                </el-select>
              </div>
              <div :class="$style.select">
                <el-select
                  v-model="typeTitle"
                  placeholder="Тип"
                  :class="$style.button"
                  @change="handleTypeSelect"
                >
                  <el-option
                    v-for="item in typeList"
                    :key="item.uuid"
                    :label="item.title"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
              <div :class="$style.select" v-if="isTransfer">
                <el-select
                  v-model="accountFrom.title"
                  placeholder="Со счета"
                  :class="$style.button"
                  @change="handleAccountFromSelect"
                >
                  <el-option
                    v-for="item in getAccountsList"
                    :key="item.label"
                    :label="item.title"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
              <div :class="$style.select">
                <el-select
                  v-model="account.title"
                  placeholder="Счет"
                  :class="$style.button"
                  @change="handleAccountSelect"
                >
                  <el-option
                    v-for="item in getAccountsList"
                    :key="item.label"
                    :label="item.title"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div v-if="showScanConfirmation" :class="$style['qr-code-block']">
            <p class="decode-result">Last result: <b>{{ result }}</b></p>
            <div>
              <StreamBarcodeReader
                  @decode="onDecode"
                  @loaded="onLoaded"
                  @error="onError"
              ></StreamBarcodeReader>
            </div>
          </div>
        </div>
        <div :class="$style.buttons">
          <el-button
            type="primary"
            :disabled="!isFormValid"
            :loading="requestInProgress"
            @click="handleAddClick"
            :class="$style.button"
          >
            Продолжить
          </el-button>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div :class="$style['fab-button-block']">
      <el-button
          circle
          @click="handleQRClick"
          :class="$style['fab-button']"
        >
          QR
        </el-button>
      </div>
    </template>
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import get from 'lodash.get';
import { required, minValue } from 'vuelidate/lib/validators';
import DatePicker from 'vue2-datepicker';
import { StreamBarcodeReader } from 'vue-barcode-reader';
import 'vue2-datepicker/index.css';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import {
  NumberInput,
} from '@/components/inputs';
import {
  LIST_CATEGORY_DEMO,
  OPERATION_TYPES,
} from '@/dictionaries';
import { dateFormattingFromDDMMYYYtoYYYYMMDDwithTimezone } from '@/utils/date-utils';
import { qrCodeResultParse, getAccountsList } from './utils';

export default {
  name: 'Operation',
  components: {
    Page,
    PageHeader,
    NumberInput,
    DatePicker,
    StreamBarcodeReader,
  },
  data() {
    return {
      result: null,
      showScanConfirmation: false,
      account: {},
      title: '',
      amount: 0,
      category: '',
      categoryTitle: 'Выберите категорию',
      categoryList: LIST_CATEGORY_DEMO,
      color: '#cdbdde',
      currency: {
        uuid: '1',
        title: 'RUB',
      },
      number: '',
      type: OPERATION_TYPES[1],
      typeTitle: OPERATION_TYPES[1].title,
      typeList: OPERATION_TYPES,
      operDate: new Date().toISOString(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: 'Сегодня',
            onClick(picker) {
              picker.$emit('pick', new Date());
            },
          }, {
            text: 'Вчера',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
        ],
        firstDayOfWeek: 1,
      },
      accountFrom: {},
    };
  },
  props: {
    types: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapFields({
      accounts: 'accounts.allAccounts',
      dictionaries: 'dictionaries',
      requestInProgress: 'requestInProgress',
    }),
    getAccountsList() {
      console.log('this.accounts', this.accounts);
      return getAccountsList(this.accounts, this.account);
    },
    isFormValid() {
      return this.$v.amount.required;
    },
    isTransfer() {
      return this.type.uuid === OPERATION_TYPES[2].uuid;
    },
  },
  async mounted() {
    this.account = this.handleFindAccountById(this.id);
    this.title = this.account.title || '';
  },
  methods: {
    ...mapActions([
      'createOperationComposition',
    ]),
    handleFindAccountById(id) {
      // eslint-disable-next-line no-underscore-dangle
      const result = this.accounts.find((item) => item._id === id);
      const title = result
        ? `${get(result, 'name', '')} ${get(result, 'amount', '')}`
        : '';
      return {
        ...result,
        title,
      };
    },
    handleCategorySelect(value) {
      this.category = value;
    },
    handleTypeSelect(value) {
      this.typeTitle = value.title;
      this.type = value;
    },
    handleAccountSelect(value) {
      this.account = value;
    },
    async handleAddClick() {
      const params = {
        account: this.account,
        amount: this.amount,
        category: this.category,
        operationType: this.type,
        createDate: dateFormattingFromDDMMYYYtoYYYYMMDDwithTimezone(this.operDate),
      };
      if (this.type.uuid === OPERATION_TYPES[2].uuid) {
        params.accountFrom = this.accountFrom;
      }
      this.$store.dispatch('setRequestInProgress', true);
      await this.createOperationComposition(params);
      this.$store.dispatch('setRequestInProgress', false);
      this.$router.push('/main');
    },
    async onDecode(content) {
      this.result = content;
      this.showScanConfirmation = !this.showScanConfirmation;
      const qrCodeStrParseObj = qrCodeResultParse(content);
      if (qrCodeStrParseObj.dateTime.date) {
        this.operDate = qrCodeStrParseObj.dateTime.date;
      }
      if (qrCodeStrParseObj.amount) {
        this.amount = qrCodeStrParseObj.amount;
      }
    },
    handleQRClick() {
      this.showScanConfirmation = !this.showScanConfirmation;
    },
    onLoaded(onload) {
      console.log('onload', onload);
    },
    onError(error) {
      console.log('error', error);
    },
    handleAccountFromSelect(value) {
      this.accountFrom = value;
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
  },
};
</script>

<style lang="scss" module>
.scan-confirmation {
  position: absolute;

  background-color: rgba(255, 255, 255, .8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
  .button {
    width: 100%;
  }
  .select {
    margin: 10px 0;
  }
  .tess {
    color: red;
  }
  .body {
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;

    .body-content {
      background: $WHITE;
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

  .fab-button-block {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px 10px;
  }

  .fab-button {
    width: 56px;
    height: 56px;
  }
  // display: grid;
  //   grid-template-rows: 1fr auto;
  //   height: 100%;
</style>
