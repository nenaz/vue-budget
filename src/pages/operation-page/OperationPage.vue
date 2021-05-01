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
                v-model="type.title"
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
        <!-- <video autoplay style="width: 100%;"></video> -->
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
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import QrScanner from 'qr-scanner';
import { mapActions } from 'vuex';
import get from 'lodash.get';
import { required, minValue } from 'vuelidate/lib/validators';
import DatePicker from 'vue2-datepicker';
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

export default {
  name: 'Operation',
  components: {
    Page,
    PageHeader,
    NumberInput,
    DatePicker,
  },
  data() {
    return {
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
      return this.accounts.map((item, key) => ({
        ...item,
        uuid: key,
        title: `${item.name} ${item.amount} руб.`,
      }));
    },
    isFormValid() {
      return this.$v.amount.required;
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
      console.log('handleTypeSelect value', value);
      this.type = value;
    },
    handleAccountSelect(value) {
      this.account = value;
    },
    async handleAddClick() {
      await this.createOperationComposition({
        account: this.account,
        amount: this.amount,
        category: this.category,
        operationType: this.type,
        createDate: dateFormattingFromDDMMYYYtoYYYYMMDDwithTimezone(this.operDate),
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
  },
};
</script>

<style lang="scss" module>
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
</style>
