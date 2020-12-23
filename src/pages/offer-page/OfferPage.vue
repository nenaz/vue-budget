<template>
  <page>
    <template v-slot:header>
      <page-header
        title="Оформление кредита:"
        :titleAmount="titleBalance"
      />
      <transition name="fade" mode="out-in">
        <offer-title-placeholder v-if="requestInProgress" />
        <div :class="$style['credit-line-text']" v-else>
          <span :class="$style['title']">
            Вам доступно {{ offers.length }}
            <br />
            предложения
          </span>
          <span :class="$style['sub-title']">
            Здесь мы описываем суть, что должен сделать пользователь
          </span>
        </div>
      </transition>
    </template>
    <template v-slot:body>
      <transition name="fade" mode="out-in">
        <offer-placeholder v-if="requestInProgress" />
        <div v-else>
          <page-body-content

            v-for="(offer, key) in offers"
            :key="key"
            :text="offerTitle(key + 1)"
            subText="Ознакомьтесь с условиями кредита на выбранную вами сумму"
          >
            <details1
              :details="offerDetails"
            />
            <base-button
              type="primary"
              @click="handleClick(offer.uuid)"
            >
              Выбрать
            </base-button>
          </page-body-content>
        </div>
      </transition>
    </template>
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import moneyFormat from '@/utils/money-formatter';
import PageBodyContent from '@/components/PageBodyContent';
import BaseButton from '@/components/BaseButton';
import { mapActions } from 'vuex';
import Details1 from '@/components/Details';
import OfferPlaceholder from './OfferPlaceholder';
import OfferTitlePlaceholder from './OfferTItlePlaceholder';

export default {
  name: 'OfferPage',
  components: {
    BaseButton,
    Details1,
    Page,
    PageBodyContent,
    PageHeader,
    OfferPlaceholder,
    OfferTitlePlaceholder,
  },
  computed: {
    ...mapFields({
      amount: 'creditParams.creditAmount',
      offers: 'tranche.creditOffers',
      termMonths: 'tranche.creditRequest.termMonths',
      percentYear: 'tranche.product.percentYear',
      monthPayment: 'creditParams.calcMonthlyPayment',
      overpayment: 'creditParams.overpayment',
      error: 'error.statusType',
      requestInProgress: 'requestInProgress',
      authStatus: 'authStatus',
      card: 'clientInstance.card',
      clientProfile: 'clientInstance.activated',
      activated: 'tranche.activated',
    }),
    titleBalance() {
      return moneyFormat(this.amount, true);
    },
    offerDetails() {
      return [
        {
          title: 'Сумма на карту',
          value: this.offers[0].amount,
        },
        {
          title: 'Переплата',
          value: this.overpayment,
        },
        {
          title: 'Ежемесячный платеж',
          value: this.monthPayment,
        },
        {
          title: 'Срок кредита',
          value: 24,
        },
        {
          title: 'Ставка',
          value: this.percentYear,
        },
      ];
    },
  },
  async beforeMount() {
    if (this.activated && this.clientProfile && this.authStatus) {
      this.$store.dispatch('setRequestInProgress', true);
      await this.compositionOfferTranche();
      const offers = this.$store.state.tranche.creditOffers;
      if (!offers.length) {
        this.$router.push({
          name: 'Info',
        });
      } else if (offers.length === 1 && this.amount === offers[0].amount) {
        await this.$store.dispatch('compositionTuneTranche', offers[0].uuid);
        if (this.card) {
          this.$router.push('/credit-sign');
        } else {
          this.$router.push('/virtual-card');
        }
      }
      this.$store.dispatch('setRequestInProgress', false);
    } else if (!this.activated || !this.clientProfile) {
      this.$router.replace('/main');
    } else {
      this.$router.replace('/');
    }
  },
  methods: {
    ...mapActions([
      'compositionTuneTranche',
      'compositionCreateRequest',
      'fetchCreateEmployment',
      'compositionOfferTranche',
    ]),
    offerTitle(num) {
      return `Предложение ${num}`;
    },
    async handleClick(uuid) {
      if (this.card) {
        this.$router.push('/credit-sign');
      } else {
        this.$router.push('/virtual-card');
      }
      this.$store.dispatch('setRequestInProgress', true);
      await this.$store.dispatch('compositionTuneTranche', uuid);
      this.$store.dispatch('setRequestInProgress', false);
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
  }
</style>
