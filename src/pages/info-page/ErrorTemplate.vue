<template>
  <div :class="$style.template">
    <div :class="$style['info-page__icon']">
      <img src="@/assets/icon-reject.svg" alt="error-icon" />
    </div>
    <div :class="$style['info-page__text']">
      <span>Ошибка!</span>
    </div>
    <div :class="$style['info-page__sub-text']">
      <span v-if="error.message">
        {{ error.message }}
      </span>
      <span v-for="(message, key) in errorMessages" :key="key">
        {{ message }}
      </span>
    </div>
    <div>
      <base-button
        type="primary"
        @click="handleGoBack"
      >
        {{ buttonText }}
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'ErrorTemplate',
  components: {
    BaseButton,
  },
  props: {
    errorMessages: {
      type: Array,
      default: () => [],
    },
    buttonText: {
      type: String,
      default: 'Попробовать ещё раз',
    },
    backUrl: {
      type: String,
      default: '/',
    },
  },
  computed: {
    ...mapFields({
      error: 'error',
    }),
  },
  methods: {
    ...mapActions([
      'resetState',
    ]),
    handleGoBack() {
      if (this.error.reset) {
        this.resetState();
      }

      this.$router.replace(`${this.backUrl}`);
      this.$store.commit('resetErrorObject');
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
