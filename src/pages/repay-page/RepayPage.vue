<template>
  <page>
    <template v-slot:header>
      <page-header
        :showBack="true"
        :showMenu="true"
      />
      <div :class="$style['credit-line-text']">
        <span :class="$style['title']">
          Досрочное погашение
          <br />
          кредита
        </span>
        <span :class="$style['sub-title']">
          Описание раздела, основной мессажд
        </span>
      </div>
    </template>
    <template v-slot:body>
      <div :class="$style['body-content']">
        <div :class="$style.inputs">
          <div :class="$style['repay-dropbox']">
            <dropdown
              title="Что погашаем досрочно:"
              :data="setWhatlist()"
              @select="handleWhatSelect"
              :placeholder="what.title"
            >
              <img
                src="@/assets/icon-arrow-green.svg"
                alt="arrow"
              />
            </dropdown>
          </div>
          <div :class="$style['work-info__input-styles']">
            <dropdown
              title="Откуда списывать средства:"
              :data="setFromList()"
              @select="handleFromSelect"
              :placeholder="fromWhere.title"
            >
              <img
                src="@/assets/icon-arrow-green.svg"
                alt="arrow"
              />
            </dropdown>
          </div>
          <money-input
            title="Сумма погашения:"
            :value="rePaymentWithFormat"
            @onInput="handleRepayAmount"
          />
          <div :class="$style['work-info__input-styles']">
            <dropdown
              title="Выберите тип погашения:"
              :data="setTypeList()"
              @select="handleTypeSelect"
              :placeholder="type.title"
            >
              <img
                src="@/assets/icon-arrow-green.svg"
                alt="arrow"
              />
            </dropdown>
          </div>
        </div>
        <div :class="$style.buttons">
          <base-button
            type="calc-button"
            @click="goNext"
            :disabled="!isPageValid"
          >
            Продолжить
          </base-button>
        </div>
      </div>
      <function-button
        v-for="(item) in items"
        :key="item.icon"
        :params="item"
        @click="handleItemClick"
      />
    </template>
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { MoneyInput } from '@/components/inputs';
import Dropdown from '@/components/Dropdown';
import moneyFormat from '@/utils/money-formatter';
import { formatDate } from '@/utils/date-utils';
import BaseButton from '@/components/BaseButton';
import FunctionButton from '@/components/FunctionButton';

export default {
  name: 'RepayPage',
  components: {
    Page,
    PageHeader,
    MoneyInput,
    Dropdown,
    BaseButton,
    FunctionButton,
  },
  data() {
    return {
      items: [
        {
          icon: 'icon-help',
          text: 'Помощь',
          link: 'help',
        },
      ],
    };
  },
  computed: {
    ...mapFields({
      amount: 'repayment.amount',
      what: 'repayment.what',
      fromWhere: 'repayment.fromWhere',
      type: 'repayment.type',
      loans: 'clientInstance.loans',
      card: 'clientInstance.card',
    }),
    isPageValid() {
      return this.amount > 0;
    },
    rePaymentWithFormat() {
      return moneyFormat(this.amount);
    },
  },
  methods: {
    goNext() {},
    handleWhatSelect(value) {
      this.$store.commit('updateRepayWhat', value);
    },
    handleFromSelect(value) {
      this.$store.commit('updateRepayFrom', value);
    },
    handleTypeSelect(value) {
      this.$store.commit('updateRepayType', value);
    },
    setFromList() {
      if (this.card) {
        return [
          {
            uuid: '1',
            title: `Карта ${this.card.number4}`,
          },
        ];
      }
      return [];
    },
    setWhatlist() {
      return this.loans.map((item) => ({
        title: `${this.amountWithFormat(item.amount)} ${this.startDateWithFormat(item.beginDate)}`,
        uuid: item.uuid,
      }));
    },
    amountWithFormat(amount) {
      return moneyFormat(amount, true);
    },
    startDateWithFormat(date) {
      return `кредит ${formatDate(date)}`;
    },
    handleRepayAmount(value) {
      this.$store.commit('updateRepayAmount', value);
    },
    setTypeList() {
      return [
        {
          uuid: '1',
          title: 'Уменьшение суммы платежа',
        },
        {
          uuid: '2',
          title: 'Уменьшение срока платежа',
        },
      ];
    },
    handleItemClick(value) {
      this.$router.push(`/${value}`);
    },
  },
};
</script>

<style lang="scss" module>
  .credit-line-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $WILD_SAND;
    padding: 12px 31px 8px;
  }

  .inputs {
    padding: 23px 16px 5px;
  }

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

  .body-content {
    background: $WHITE;
    // backdrop-filter: blur(16px);
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
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
</style>
