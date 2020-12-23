<template>
  <div :class="$style.template">
    <div :class="$style['info-page__icon']">
      <img src="@/assets/icon-reject.svg" alt="success-icon" />
    </div>
    <div :class="$style['info-page__text']">
      <span>Отказ!</span>
    </div>
    <div :class="$style['info-page__sub-text']">
      <span>
        К сожалению продолжение оформления кредита не возможно
        <br />
        Варианты дейсткий для клиента попробуйте уменьшить или увеличить
      </span>
    </div>
    <div>
      <base-button
        type="primary"
      >
        Понятно
      </base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton';

export default {
  name: 'RejectTemplate',
  components: {
    BaseButton,
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
