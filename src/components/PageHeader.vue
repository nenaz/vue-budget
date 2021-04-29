<template>
  <div :class="$style.header">
    <div :class="$style['logo-block']">
      <div>
        <span
          v-if="showBack"
          :class="$style.back"
          @click="handleBackClick"
        />
      </div>
      <div>
        <span :class="$style.title">
          {{ title }}
        </span>
      </div>
      <div>
        <span
          v-if="showMenu"
          :class="$style.menu"
          @click="handleMenuClick"
        />
      </div>
    </div>
    <!-- <div v-if="title" :class="$style['header-balance']">
      <span :class="$style.title">
        {{ title }}
      </span>
      <span :class="$style.amount">
        {{ titleAmount }}
      </span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    titleAmount: {
      type: String,
      default: '',
    },
    showMenu: {
      type: Boolean,
      default: false,
    },
    showBack: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleMenuClick() {
      this.$store.commit('SHOW_MENU');
    },
    handleBackClick() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" module>
  .header {
    background-color: transparent;
    box-sizing: border-box;

    .logo-block {
      width: 100%;
      height: 49px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid $ATHENS_GRAY_TITLE;
      display: grid;
      grid-template-columns: 20px 1fr 20px;
      padding: 15px;
      box-sizing: border-box;

      .logo {
        width: 101px;
        height: 24px;
        background-image: url('../assets/logo.svg');
        display: inline-block;
        background-repeat: no-repeat;
      }

      .menu {
        width: 20px;
        height: 20px;
        background-image: url('../assets/icon-menu-burger.svg');
        display: inline-block;
        background-repeat: no-repeat;
      }
      .back {
        width: 20px;
        height: 20px;
        background-image: url('../assets/icon-arrow-green.svg');
        display: inline-block;
        background-repeat: no-repeat;
      }
    }

    .header-balance {
      display: flex;
      flex-direction: column;
      align-items: baseline;
      background-color: $WHITE;
      // border-top: 1px solid $ATHENS_GRAY_TITLE;
      padding: 16px 32px;

      .title {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        font-family: 'Source Sans Pro';
        font-weight: bold;
        color: white;
        text-shadow: 1px 1px black;
      }

      .amount {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 21px;
        line-height: 26px;
        color: $APPLE;
      }
    }
  }
</style>
