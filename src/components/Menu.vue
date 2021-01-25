<template>
  <div :class="$style.menu">
    <div :class="$style.button">
      <span
        :class="$style.close"
        @click="handleCloseClick"
      />
    </div>
    <div :class="$style.wrapper">
      <div :class="$style.logo">
        <span :class="$style.icon" />
      </div>
      <div :class="$style['item-wrapper']">
        <div :class="$style.list">
          <span
            :class="$style.item"
            @click="handleClick"
            link="/main"
          >
            1
          </span>
          <span
            :class="$style.item"
            @click="handleClick"
            link="/card-details"
          >
            2
          </span>
          <span
            :class="$style.item"
            @click="handleClick"
            link="/card-details"
          >
            3
          </span>
          <span
            :class="$style.item"
            @click="handleClick"
            link="/credit-params"
          >
            4
          </span>
          <span
            :class="$style.item"
            @click="handleClick"
            link="/help"
          >
            5
          </span>
          <span :class="$style.item" @click="handleExitClick">
            Выход
          </span>
        </div>
        <div :class="$style['button-close']">
          <span :class="$style['item-close']" @click="handleCloseClick">
            Закрыть меню
          </span>
          <span :class="$style['item-version']">v.{{ getVersion }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash.get';
/**
 * переделать на генерацию пунктов меню по входящим параметрам
 */
export default {
  name: 'LeftMenu',
  computed: {
    getVersion() {
      return '0.5.0';
    },
  },
  methods: {
    handleCloseClick() {
      this.$emit('close');
    },
    handleExitClick() {
      this.$emit('exit');
    },
    handleClick(event) {
      const link = get(event, 'target.attributes.link.value', '');
      this.$emit('select', link);
    },
  },
};
</script>

<style lang="scss" module>
  .logo {
    text-align: left;
  }

  .icon {
    width: 121px;
    height: 24px;
    display: inline-block;
    background-size: cover;
  }

  .button {
    text-align: right;
  }

  .close {
    background-image: url('../assets/icon-close.svg');
    display: inline-block;
    background-size: cover;
    width: 20px;
    height: 20px;
  }

  .menu {
    position: absolute;
    width: calc(100vw);
    background-color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    bottom: 0;
    height: 100vh;
    z-index: 99999999999;
    background-color: #52AE30;
    padding: 26px 26px 68px;
    box-sizing: border-box;
  }

  .wrapper {
    padding: 11px 26px;
    height: 100%;
  }

  .list {
    padding-top: 40px;
  }

  .item {
    font-family: Squad;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 56px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
  }

  .button-close {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
  }

  .item-close, .item-version {
    font-family: Squad;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
  }

  .item-wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    height: calc(100% - 53px);
  }
</style>
