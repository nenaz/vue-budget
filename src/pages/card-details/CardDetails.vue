<template>
  <page
    :no-top-bottom-padding="true"
  >
    <template v-slot:header>
      <page-header
        :showBack="true"
        :showMenu="true"
      />
    </template>
    <template v-slot:body>
      <div :class="$style['card-details']">
        <div :class="$style.attributes">
          <div :class="$style['first-line']">
            <span :class="$style.title">Карта для покупок</span>
            <span :class="$style['card-logo']" />
          </div>
          <div :class="$style['second-line']">
            <span :class="$style.amount">{{ cardAmountWithFormat }}</span>
            <span />
            <span :class="$style.number">{{ cardNumber }}</span>
            <span :class="$style.date">{{ cardExpire }}</span>
          </div>
        </div>
      </div>
      <div :class="$style['requisites-block']">
        <div :class="$style['text-block']">
          <span :class="$style.title">Реквизиты карты для покупок</span>
          <span :class="$style.text">
            Для оплаты товаров в интернет магазинах скопируйте реквизиты карты
          </span>
        </div>
        <requisites :data="requisites" />
        <page-body-content
          text="Детали"
        >
          <details1
            :details="createDetails"
          />
        </page-body-content>
        <page-body-content
          text="Виртуальная карта"
        >
          <span :class="$style.description">{{ description }}</span>
        </page-body-content>
        <!-- <page-body-content
          text="Документы по карте"
        >
          <document-link-list
            :documents="documents"
          />
        </page-body-content> -->
        <functional-buttons-module
          :items="items"
        />
      </div>
    </template>
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { FunctionalButtonsModule } from '@/modules/functional-buttons';
import PageBodyContent from '@/components/PageBodyContent';
// import DocumentLinkList from '@/components/DocumentLinkList';
import Details1 from '@/components/Details';
import Requisites from '@/components/Requisites';
import moneyFormat from '@/utils/money-formatter';
import { sumOfAllLoans } from '@/utils/sum-all-loans';
import { MIN_SUM_FOR_CREDIT } from '@/constants/constants';

export default {
  name: 'CardDetails',
  components: {
    Page,
    PageHeader,
    FunctionalButtonsModule,
    PageBodyContent,
    // DocumentLinkList,
    Details1,
    Requisites,
  },
  data() {
    return {
      baseLimit: 225000,
      availableLimit: 189000,
      description: `Описание особенностей вируальрной карты.
       В интернет магазинах можно оплачивать покупки используя
       реквизиты вашей виртуальной карты. Чтобы узнать их, перейдите
       по ссылке ниже, или найдите их в разделе виртуальная карта`,
      items: [
        {
          icon: 'icon-down',
          text: 'Взять сумму для покупок',
          link: 'credit-params',
          disabled: false,
        },
        {
          icon: 'icon-up',
          text: 'Досрояное погашение с карты',
          link: 'repayment',
        },
        {
          icon: 'icon-help',
          text: 'Помощь',
          link: 'help',
        },
      ],
      documents: [
        {
          name: 'Кредитный договор',
          link: 'https://www.otpbank.ru/f/documents/credits/obshie-uslovia_necel.pdf',
        },
        {
          name: 'График платежей',
          link: 'https://www.otpbank.ru/f/documents/credits/obshie-uslovia_necel.pdf',
        },
        {
          name: 'Индивидуальные условия',
          link: 'https://www.otpbank.ru/f/documents/credits/obshie-uslovia_necel.pdf',
        },
      ],
      requisites: [
        {
          name: 'Номер карты:',
          maskValue: '•••• •••• •••• 5678',
          value: '1234 5678 9012 5678',
          showButton: true,
          buttonText: 'Показать и копировать',
          showValue: false,
        },
        {
          name: 'Код безопасности:',
          maskValue: '•••',
          value: '384',
          showButton: true,
          buttonText: 'Показать и копировать',
          showValue: false,
        },
        {
          name: 'Срок действия:',
          maskValue: '',
          value: '07/21',
          showButton: false,
          buttonText: 'Показать и копировать',
          showValue: true,
        },
      ],
    };
  },
  computed: {
    ...mapFields({
      card: 'clientInstance.card',
      authStatus: 'authStatus',
      credits: 'clientInstance.loans',
    }),
    createDetails() {
      return [
        {
          title: 'Ежемесячное обслуживание',
          value: '0.00',
        },
        {
          title: 'Срок действия',
          value: '24 месяца',
        },
        {
          title: 'Номер договора',
          value: '563534567',
        },
        {
          title: 'Тип карты',
          value: 'MasterCard World',
        },
        {
          title: 'Дата открытия',
          value: '12 августа 2020',
        },
      ];
    },
    cardAmountWithFormat() {
      return moneyFormat(this.card.balance, true);
    },
    cardNumber() {
      return `**** ${this.card.number4}`;
    },
    cardNumberFull() {
      return `**** **** **** ${this.card.number4}`;
    },
    cardExpire() {
      const date = new Date(this.card.expire);
      const year = String(date.getFullYear());
      const month = date.getMonth() + 1;
      return `${month}/${year.substring(2, 4)}`;
    },
    sumAllLoans() {
      return sumOfAllLoans(this.credits);
    },
    getAvailableLimit() {
      return this.$store.state.clientInstance.line.limit;
    },
  },
  beforeMount() {
    if (this.authStatus) {
      if (!this.card) {
        this.$router.replace('/main');
      }
      if (this.getAvailableLimit && this.credits.length) {
        // ПЕРЕДЕЛАТЬ НОРМАЛЬНО!!!!
        this.items[0].disabled = (this.getAvailableLimit - this.sumAllLoans) <= MIN_SUM_FOR_CREDIT;
      }
    } else {
      this.$router.replace('/');
    }
  },
  methods: {
    handleItemClick() {},
  },
};
</script>

<style lang="scss" module>
  .card-details {
    background-color: $WHITE;
    height: 104px;
    padding: 19px 16px;
    border-radius: 0 0 8px 8px;
    box-sizing: border-box;

    .first-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 19px;

      .title {
        font-family: Squad;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
        color: $TUNDORA;
      }

      .card-logo {
        background-image: url('../../assets/icon-card-logo.svg');
        display: inline-block;
        width: 26px;
        height: 16px;
      }
    }

    .second-line {
      display: grid;
      grid-template-columns: auto 1fr 75px 40px;
      align-items: baseline;

      .amount {
        font-family: Squad;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 42px;
        color: $FOREST_GREEN;
      }

      .number, .date {
        font-family: Squad;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        display: flex;
        align-items: center;
        letter-spacing: -0.0024em;
        color: $DOVE_GRAY_CARD_DETAILS;
      }
    }
  }

  .description {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.87);
    margin-top: 17px;
    text-align: left;
    display: inline-block;
  }

  .requisites-block {
    padding: 18px 0 8px;

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
  }
</style>
