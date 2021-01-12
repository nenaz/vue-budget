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
        <div :class="$style['body-content']">
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
                :placeholder="category.title"
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
        <div :class="$style.buttons">
          <base-button
            type="primary"
            :disabled="!isPageValid"
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
import { mapActions } from 'vuex';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import {
  NumberInput,
  // PhoneInput,
  // SuggestionInput,
  BaseInput,
} from '@/components/inputs';
import BaseButton from '@/components/BaseButton';
import Dropdown from '@/components/Dropdown';
import { LIST_CATEGORY_DEMO, OPERATION_TYPES } from '@/dictionaries';
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
      name: '',
      number: '',
      amount: 0,
      currency: {
        uuid: '1',
        title: 'RUB',
      },
      color: '#cdbdde',
      category: LIST_CATEGORY_DEMO[0],
      type: {
        uuid: '0',
        title: 'Расход',
      },
      categoryList: LIST_CATEGORY_DEMO,
      // accountTypes: LIST_CATEGORY_DEMO,
      typeList: OPERATION_TYPES,
      account: { uuid: '-1', title: '' },
      // accountsList: this.accounts,
    };
  },
  computed: {
    ...mapFields({
      accounts: 'accounts',
    }),
    isPageValid() {
      return this.amount > 0 || this.account.uuid !== -1;
      // return false;
    },
    getAccountsList() {
      console.log('this.accounts', this.accounts);
      return this.accounts.map((item, key) => ({
        ...item,
        uuid: key,
        title: `${item.name} ${item.amount} руб.`,
      }));
    },
  },
  methods: {
    ...mapActions([
      'createOperationComposition',
    ]),
    handleCategorySelect(value) {
      this.category = value;
    },
    handleTypeSelect(value) {
      console.log('handleTypeSelect', value);
      this.type = value;
    },
    handleAccountSelect(value) {
      this.account = value;
    },
    async handleAddClick() {
      console.log('handleAddClick');
      await this.createOperationComposition({
        amount: this.amount,
        category: this.category,
        type: this.type,
        account: this.account,
      });
    },
  },
};
</script>

<style lang="scss" module>
  .body {
    position: relative;

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
