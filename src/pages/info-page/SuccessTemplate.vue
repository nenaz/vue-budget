<template>
  <div :class="$style.template">
    <div :class="$style['info-page__icon']">
      <img src="@/assets/icon-success.svg" alt="success-icon" />
    </div>
    <div :class="$style['info-page__text']">
      <span>Успешно!</span>
    </div>
    <div :class="$style['info-page__sub-text']">
      <span>
        {{ messageWithEmail }}<br />
        Деньги поступили на виртуальную карту
      </span>
    </div>
    <div>
      <base-button
        :handleClick="goToMainPage"
        @click="goToMainPage"
        type="transparent-border-color"
      >
        Перейти на главную страницу
      </base-button>
      <base-button
        :handleClick="goToMainPage"
        @click="goToMainPage"
        type="transparent-border-color"
      >
        Перейти на страницу виртуальной карты
      </base-button>
      <base-button
        :handleClick="goToMainPage"
        @click="goToMainPage"
        type="transparent-border-color"
      >
        Почитать как пользоваться деньгами
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'SuccessTemplate',
  components: {
    BaseButton,
  },
  computed: {
    ...mapFields({
      email: 'credit.email',
    }),
    messageWithEmail() {
      return `Документы успешно подписаны и отправлены на почту ${this.email}`;
    },
  },
  mounted() {
    this.resetStateTranche();
  },
  methods: {
    ...mapActions([
      'resetStateTranche',
    ]),
    goToMainPage() {
      this.$router.replace('/main');
    },
    goToHelp() {
      this.$router.push('/help');
    },
    goToCard() {
      this.$router.push('/card-details');
    },
  },
};
</script>

<style lang="scss" module>
  .info-page {
    &__icon {
      margin: 60px auto 35px;

      img {
        width: 75px;
        height: 59px;
      }
    }

    &__text {
      margin: 21px 0 12px;
      font-family: Squad;
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
      color: #000000;
    }

    &__sub-text {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #4A4A4A;
    }
  }

  .template {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    height: 100%;
  }
</style>
