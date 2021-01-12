<template>
  <div :class="$style.header">
    <div :class="$style['logo-block']">
      <!-- <img src="@/assets/logo.svg" alt="logo" :class="$style.logo" /> -->
      <div :class="$style['header-title']">
        <img src="@/assets/icon-lock.svg" alt="Icon_lock" :class="$style.icon" />
        <!-- <span :class="$style['header-text']">
          ОТП Банк никому
          <br />
          не передает ваши данные
        </span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageAuthHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    handleBackButton: {
      type: Function,
      default: () => {},
    },
    handleMenuButton: {
      type: Function,
      default: () => {},
    },
    isMenuButtonHide: {
      type: Boolean,
      default: false,
    },
    isBackButtonHide: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    backButtonStyle() {
      return this.isBackButtonHide
        ? 'page-header__icon-button__empty'
        : '';
    },
    menuButtonStyle() {
      return this.isMenuButtonHide
        ? 'page-header__icon-button__empty'
        : '';
    },
  },
};
</script>

<style lang="scss" module>
  .header {
    height: 72px;
    background-color: $WHITE;
    padding: 24px 17px;
    box-sizing: border-box;

    .logo-block {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .header-title {
      display: flex;
      flex-direction: row;

      .header-text {
        font-family: Squad;
        font-style: normal;
        font-weight: normal;
        font-size: 10px;
        line-height: 10px;
        color: $BOULDER;
        text-align: left;
        margin-left: 9px;
      }
    }

    .logo {
      width: 121px;
      height: 24px;
    }

    .icon {
      width: 20px;
      height: 20px;
    }
  }
</style>
