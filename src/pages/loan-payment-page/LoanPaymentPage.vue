<template>
  <page>
    <template v-slot:header>
      <page-header
        :showBack="true"
        :showMenu="true"
      />
    </template>
    <template v-slot:body>
      <div :class="$style['text-block']">
        <span :class="$style.title">Платеж по кредиту 25 000₽ от 20 августа 2020</span>
        <span :class="$style.text">
          Выберите удобный для вас способ погашения кредита, для оплаты
           используйте ФИО  и номер вашего счета:
        </span>
      </div>
      <requisites :data="requisites" />
      <tab-panel
        :buttons="buttons"
        @click="handleTabClick"
      />
      <div
        v-if="isAmountTabActive"
      >
        <page-body-content
          v-for="(item) in onlinePay"
          :key="item.name"
          :text="item.title"
        >
          <details1
            :details="item.data"
          />
          <base-button
            type="primary"
            @click="handlePayButton(item.link)"
          >
            {{ item.buttonText }}
          </base-button>
        </page-body-content>
      </div>
      <div
        v-else
      >
        <page-body-content
          v-for="(item) in cash"
          :key="item.name"
          :text="item.title"
        >
          <details1
            :details="item.data"
          />
          <base-button
            type="primary"
          >
            {{ item.buttonText }}
          </base-button>
        </page-body-content>
      </div>
    </template>
  </page>
</template>

<script>
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import Requisites from '@/components/Requisites';
import Details1 from '@/components/Details';
import PageBodyContent from '@/components/PageBodyContent';
import BaseButton from '@/components/BaseButton';
import TabPanel from '@/modules/tab-panel/TabPanel';
import { TabValues } from '@/store/types';
import {
  MOBILE_APP,
  CARD_OF_ANOTHER_BANK,
  QIWI,
  YANDEX_MONEY,
  ELECSNET,
  AMT_OTP,
  SELT_SERVICE,
  SVYAZNOY,
  MTC,
  BEELINE,
} from './constants';

export default {
  name: 'LoanPaymentPage',
  components: {
    Page,
    PageHeader,
    Requisites,
    Details1,
    PageBodyContent,
    BaseButton,
    TabPanel,
  },
  data() {
    return {
      activeTab: TabValues.ONLINE,
      buttons: {
        [TabValues.ONLINE]: {
          text: 'Онлайн',
          active: true,
          type: 'primary',
          name: TabValues.ONLINE,
        },
        [TabValues.CASH]: {
          text: 'Наличными',
          active: false,
          type: 'transparent',
          name: TabValues.CASH,
        },
      },
      onlinePay: [
        {
          name: 'MOBILE_APP',
          data: MOBILE_APP,
          buttonText: 'Скачать приложение',
          title: 'Мобильное приложение банка',
        },
        {
          name: 'CARD_OF_ANOTHER_BANK',
          data: CARD_OF_ANOTHER_BANK,
          buttonText: 'Оплатить',
          title: 'Карта другого банка',
        },
        {
          name: 'QIWI',
          data: QIWI,
          buttonText: 'Оплатить',
          title: 'QIWI кошелек',
          link: 'https://qiwi.com/payment/form/804',
        },
        {
          name: 'YANDEX_MONEY',
          data: YANDEX_MONEY,
          buttonText: 'Оплатить',
          title: 'Яндекс деньги',
          link: 'https://money.yandex.ru/shop/1438',
        },
        {
          name: 'ELECSNET',
          data: ELECSNET,
          buttonText: 'Оплатить',
          title: 'Кошелек Элекснет',
          link: 'https://1.elecsnet.ru/NotebookFront/services/0mhp/default.aspx?groupId=196',
        },
      ],
      cash: [
        {
          name: 'AMT_OTP',
          data: AMT_OTP,
          buttonText: 'Найти банкомат',
          title: 'Банкоматы ОТП Банка',
        },
        {
          name: 'SELT_SERVICE',
          data: SELT_SERVICE,
          buttonText: 'Найти банкомат',
          title: 'Банкоматы ОТП Банка',
        },
        {
          name: 'SVYAZNOY',
          data: SVYAZNOY,
          buttonText: 'Найти банкомат',
          title: 'Банкоматы ОТП Банка',
          link: 'https://www.svyaznoy.ru/shops',
        },
        {
          name: 'MTC',
          data: MTC,
          buttonText: 'Найти банкомат',
          title: 'Банкоматы ОТП Банка',
          link: 'https://moskva.mts.ru/personal/podderzhka/zoni-obsluzhivaniya/offices',
        },
        {
          name: 'BEELINE',
          data: BEELINE,
          buttonText: 'Найти банкомат',
          title: 'Банкоматы ОТП Банка',
          link: 'https://moskva.beeline.ru/customers/beeline-map/?lat=55.75999999999371&lon=37.6317&zoom=12',
        },
      ],
      requisites: [
        {
          name: 'Номер вашего счета:',
          maskValue: '•••• •••• •••• 5678',
          value: '40817810700456241258',
          showButton: true,
          buttonText: 'Копировать',
          showValue: true,
        },
        {
          name: 'Сумма платежа:',
          maskValue: '•••',
          value: '2 680,45 ₽',
          showButton: true,
          buttonText: 'Копировать',
          showValue: true,
        },
      ],
    };
  },
  computed: {
    isAmountTabActive() {
      return this.activeTab === TabValues.ONLINE;
    },
  },
  methods: {
    handleTabClick(newActiveIndex) {
      this.buttons[this.activeTab].active = false;
      this.buttons[newActiveIndex].active = true;
      this.activeTab = newActiveIndex;
    },
    handlePayButton(link) {
      window.open(link, '_blank');
    },
  },
};
</script>

<style lang="scss" module>
  .text-block {
    display: flex;
    flex-direction: column;
    padding: 0 16px;

    .title {
      display: inline-block;
      text-align: left;
      font-family: Squad;
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 32px;
      color: $BLACK;
      padding-bottom: 7px;
    }

    .text {
      display: inline-block;
      text-align: left;
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: $TUNDORA;
    }
  }
</style>
